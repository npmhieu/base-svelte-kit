<script>

    import {currentUser, userStore, resumeUrl} from "@stores/user-store";

    let previousCvUrl = '';
    $: if ($resumeUrl !== previousCvUrl) {
        loadPdfFile();
    }
    let canvasRef;
    async function renderBlank() {
        let blank = atob('JVBERi0xLjEKJeLjz9MKMSAwIG9iaiAKPDwKL1BhZ2VzIDIgMCBSCi9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iaiAKMiAwIG9iaiAKPDwKL01lZGlhQm94IFswIDAgNTk1IDg0Ml0KL0tpZHMgWzMgMCBSXQovQ291bnQgMQovVHlwZSAvUGFnZXMKPj4KZW5kb2JqIAozIDAgb2JqIAo8PAovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9UeXBlIC9QYWdlCj4+CmVuZG9iaiB4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA2NiAwMDAwMCBuIAowMDAwMDAwMTQ5IDAwMDAwIG4gCnRyYWlsZXIKCjw8Ci9Sb290IDEgMCBSCi9TaXplIDQKPj4Kc3RhcnR4cmVmCjIyMQolJUVPRgo=');
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        pdfjsLib
                .getDocument({ blank }).promise
                .then(doc => doc.getPage(1))
                .then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });

                    // Prepare canvas using PDF page dimensions
                    var context = canvasRef.getContext('2d');
                    canvasRef.height = viewport.height;
                    canvasRef.width = viewport.width;

                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext);
                });
    }

    async function loadBlankFile(){
        previousCvUrl = $resumeUrl;
        console.log('load file');

        await renderBlank();

        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        const userId = $currentUser.userId;
        console.log(userId);
        if (!$currentUser.cvContent) {
            $userStore.users[userId].cvContent = atob((await fetch(`/api/candidate/${userId}/resume`).then(response => response.json())).content);
        }
        let data = $userStore.users[userId].cvContent;

        pdfjsLib
                .getDocument({ data }).promise
                .then(doc => doc.getPage(1))
                .then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });

                    // Prepare canvas using PDF page dimensions
                    var context = canvasRef.getContext('2d');
                    canvasRef.height = viewport.height;
                    canvasRef.width = viewport.width;

                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext);
                });
    }

    async function loadPdfFile(){
        previousCvUrl = $resumeUrl;
        console.log('load file');

        await renderBlank();

        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        const userId = $currentUser.userId;
        console.log(userId);
        if (!$currentUser.cvContent) {
            $userStore.users[userId].cvContent = atob((await fetch(`/api/candidate/${userId}/resume`).then(response => response.json())).content);
        }
        let data = $userStore.users[userId].cvContent;

        pdfjsLib
                .getDocument({ data }).promise
                .then(doc => doc.getPage(1))
                .then(page => {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });

                    // Prepare canvas using PDF page dimensions
                    var context = canvasRef.getContext('2d');
                    canvasRef.height = viewport.height;
                    canvasRef.width = viewport.width;

                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext);
                });
    }



</script>



{#if resumeUrl}
    <canvas bind:this={canvasRef} />
{:else}
    <h1>Profile not found please try again</h1>
{/if}

<style>
    #pdf-viewer {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        overflow: auto;
    }

    .pdf-page-canvas {
        display: block;
        margin: 5px auto;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>