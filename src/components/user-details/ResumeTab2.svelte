<script lang="ts">
    import {CurrentPage} from "@core/constants";

    const PDFJS = window['pdfjs-dist/build/pdf'];
    PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    import {currentUser, userStore, resumeUrl} from "@stores/user-store";

    import {pageStore} from '@stores/page.store';

    let previousCvUrl = '';
    $: if ($resumeUrl !== previousCvUrl) {
        loadAndRenderCV();
    }

    let cvContentWrapper;
    let previousCvTimeBase;
    let currPage = 1; //Pages are 1-based not 0-based
    let numPages = 0;
    let pdfFile = null;
    let onBrowser = false;
    let cvLoaded = null;

    // if ($currentUser.haveCV) {
    //     loadAndRenderCV();
    // }


    async function loadAndRenderCV() {
        previousCvUrl = $resumeUrl;
        console.log('clear canvas');
        document.getElementsByClassName('cv-content-wrapper').innerHTML = "";

        if($resumeUrl == null){
            return;
        }

        cvLoaded = null;
        try {
            const userId = $currentUser.userId;
            console.log(userId);
            if (!$currentUser.cvContent) {
                $userStore.users[userId].cvContent = atob((await fetch(`/api/candidate/${userId}/resume`).then(response => response.json())).content);
            }

            PDFJS.getDocument({data: $userStore.users[userId].cvContent}).promise.then(doc => {
                pdfFile = doc;

                //How many pages it has
                numPages = doc.numPages;

                //Start with first page
                doc.getPage(1).then(handlePages);
                cvLoaded = true;
            })
        } catch (e) {
            cvLoaded = false;
        }
    }

    function handlePages(page) {
        const canvasRef: HTMLCanvasElement = document.createElement('canvas');
        canvasRef.width = cvContentWrapper?.width || 800;
        const pageRef: HTMLDivElement = document.createElement('div');
        pageRef.classList.add('cv-page');
        cvContentWrapper.append(pageRef);
        pageRef.append(canvasRef);
        const viewport = page.getViewport({scale: canvasRef.width / page.getViewport({scale: 1}).width});

        const context = canvasRef.getContext('2d');
        canvasRef.height = viewport.height;
        canvasRef.width = viewport.width;

        page.render({
            canvasContext: context,
            viewport: viewport
        }).promise.then(() => page.getTextContent()).then((textContent) => renderText({
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


<div class="cv-tab">
    {#if $pageStore.currentPage === CurrentPage.CandidateDetailInNewTab && cvLoaded}
<!--        <button class="btn raised accent btn-open-new-tab">-->
<!--            Open in new tab-->
<!--        </button>-->
    {/if}
    <div class="cv-content-wrapper" bind:this={cvContentWrapper}>
    </div>
</div>

<style lang="scss">
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

    > div {
      color: transparent;
      position: absolute;
      white-space: pre;
      cursor: text;
      transform-origin: 0 0;
    }
  }
</style>
