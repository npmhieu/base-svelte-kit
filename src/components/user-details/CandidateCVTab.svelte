<script lang="ts">
    import {CurrentPage} from "@core/constants";

    const PDFJS = window['pdfjs-dist/build/pdf'];
    if (!PDFJS.GlobalWorkerOptions.workerSrc) {
        PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    }
    import {createEventDispatcher} from "svelte";

    export let pdfContent;
    let showError = false;
    let cvContentWrapper;
    let currPage = 1; //Pages are 1-based not 0-based
    let numPages = 0;
    let pdfFile = null;
    let cvLoaded = null;
    export let zoomLevel = 1;
    export let baseCanvasWidth = 800;

    export let visible = true;

    let errorDetail = '';

    const dispatch = createEventDispatcher();

    function emitCVErrorEvent() {
        dispatch('cvRenderError');
    }


    $: {
        switch (pdfContent && zoomLevel) {
            case undefined:
                cvLoaded = false;
                showError = false;
                errorDetail = '';
                break;
            case null:
            case '':
                cvLoaded = true;
                showError = true;
                errorDetail = 'File not found';
                break;
            default:
                loadAndRenderCV();
        }

    }

    function clearPdfRender() {
        currPage = 1;
        numPages = 0;
        if (cvContentWrapper) {
            cvContentWrapper.innerHTML = '';
        }
    }


    async function loadAndRenderCV() {
        try {
            clearPdfRender();
            cvLoaded = true;
            showError = false;
            errorDetail = '';
            PDFJS.getDocument({data: pdfContent}).promise.then(doc => {
                pdfFile = doc;

                //How many pages it has
                numPages = doc.numPages;

                //Start with first page
                doc.getPage(1).then(handlePages);
            }).catch(e => {
                cvLoaded = true;
                showError = true;
                errorDetail = 'File is corrupted';
                emitCVErrorEvent();
            });
        } catch (e) {
            cvLoaded = true;
            showError = true;
            errorDetail = 'File is corrupted';
            emitCVErrorEvent();
        }
    }

    function handlePages(page) {
        const canvasRef: HTMLCanvasElement = document.createElement('canvas');
        canvasRef.width = cvContentWrapper?.width || baseCanvasWidth;
        const pageRef: HTMLDivElement = document.createElement('div');
        pageRef.classList.add('cv-page');
        cvContentWrapper.append(pageRef);
        pageRef.append(canvasRef);
        const viewport = page.getViewport({
            scale: (canvasRef.width / page.getViewport({scale: 1}).width) * zoomLevel
        });

        const context = canvasRef.getContext('2d');
        canvasRef.height = viewport.height;
        canvasRef.width = viewport.width;

        page.render({
            canvasContext: context,
            viewport: viewport
        }).promise
            .then(() => page.getTextContent())
            .then((textContent) => renderText({
                textContent,
                canvasRef,
                pageRef,
                viewport
            }));

        currPage++;
        if (pdfFile !== null && currPage <= numPages) {
            pdfFile.getPage(currPage).then(handlePages);
        }
    }

    function renderText({textContent, canvasRef, pageRef, viewport}): void {
        const textRef = document.createElement('div');
        textRef.classList.add('text-layer');
        textRef.style.cssText = `left: ${canvasRef.offsetLeft}px; top: ${canvasRef.offsetTop}px; height: ${canvasRef.offsetHeight}px; width: ${canvasRef.offsetWidth}px`;
        pageRef.append(textRef);

        PDFJS.renderTextLayer({
            textContent: textContent,
            container: textRef,
            viewport: viewport,
            textDivs: [],
            enhanceTextSelection: true
        });
    }
</script>


<div class="cv-tab" style="display: {visible ? 'flex' : 'none'}">
    {#if pdfContent}
        <div class="cv-content-wrapper" bind:this={cvContentWrapper}>
        </div>
    {/if}
    {#if !cvLoaded && !showError}
        <div class="content-block">
            <div class="loader-wrapper">
                <div class="loader-animation">
                    <svg>
                        <path d="M442 79.1H0V65.5h412.4v-7.1H0V0h442v79.1zm0 7.1V107H181.2v-7.1H0V86.2h442zM50.1 24.6v7.2h53.3v-7.2H50.1zm0-16.8v7.1h89.3V7.8H50.1zM19.3 38.9c10.6 0 19.2-8.7 19.2-19.4C38.5 8.7 30 0 19.3 0A19.4 19.4 0 0 0 0 19.5c0 10.7 8.6 19.4 19.3 19.4z"/>
                    </svg>
                </div>
            </div>
        </div>
    {/if}
    {#if showError}
        <div class="cv-error-wrapper w-full h-full flex flex-col items-center justify-center">
            <img class="no-cv" src="/images/file-error.png"/>
            <p class="issue">
                Sorry, we're unable to display this CV.
            </p>
            {#if errorDetail}
                <p class="desc">{errorDetail}</p>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
  .cv-error-wrapper {
    padding: 50px;

    img.no-cv {
      width: 154px;
      user-select: none;
    }

    p.issue {
      font-size: 16px;
      color: #4e4e4e;
      font-weight: 600;
      margin-top: 40px;
      margin-bottom: 20px;
    }

    p.desc {
      font-size: 14px;
      color: #787993;
      font-weight: 600;
    }
  }

  .content-block {
    background-color: #fff;
    width: 90%;
    height: 90%;
    margin: auto;
    border: 1px solid #dddfe2;
    border-radius: 3px;
  }

  .loader-wrapper {
    height: 300px;
    padding: 12px;
  }

  .loader-animation {
    background: #f5f6f7;
    height: 107px;
    width: 441px;
    overflow: hidden;
    position: relative;

    &:before {
      background-color: #f5f6f7;
      background-image: url(https://i.postimg.cc/VLC3WF9t/3pk-Fb-IT7-rn.gif);
      background-repeat: repeat-y;
      background-size: 100% 1px;
      content: ' ';
      display: block;
      height: 100%;
    }

    svg {
      position: absolute;
      fill: #fff;
      top: 0;
      left: -1px;
      width: 442px;
      height: 107px;
    }
  }

  .cv-tab {
    display: flex;
    flex: 1 1 0;
    overflow: auto;
    position: relative;
  }

  .btn-open-new-tab {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .cv-content-wrapper {
    overflow: auto;
    height: 100%;
    flex: 1 1 0;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  :global(.cv-content-wrapper canvas) {
    margin: 0 auto;
  }

  :global(.cv-page) {
    position: relative;
    margin: 10px 0;
    box-shadow: 0 3px 6px 0 rgb(27 58 146 / 16%);
    width: 100%;

    canvas {
      width: 100%;
    }
  }

  :global(.text-layer span) {
    color: transparent;
  }

  :global(.text-layer) {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    opacity: 0.2;
    line-height: 1.0;
    margin: 0 auto;

    > div {
      color: transparent;
      position: absolute;
      white-space: pre;
      cursor: text;
      transform-origin: 0 0;
    }
  }
</style>
