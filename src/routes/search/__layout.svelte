<svelte:head>
    <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
    />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

<!--    &lt;!&ndash; CSS Reset &ndash;&gt;-->
<!--    <link-->
<!--            rel="stylesheet"-->
<!--            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"-->
<!--    />-->
<!--    &lt;!&ndash; Milligram CSS &ndash;&gt;-->
<!--    <link-->
<!--            rel="stylesheet"-->
<!--            href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"-->
<!--    />-->

    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

</svelte:head>

<main class="container-fluid">
    <slot />
</main>
<footer class="container-fluid">
        {new Date().getFullYear()} &copy; MY APP
</footer>

<style>
    :global(body, html, #svelte) {
        width: 100vw;
        min-height: 100vh;
    }
    :global(#svelte) {
        display: flex;
        flex-direction: column;
    }
    main {
        flex: 1;
        margin-top: 3rem;
    }
    footer {
        margin-top: auto;
        font-size: 0.8em;
        opacity: 0.5;
    }
</style>