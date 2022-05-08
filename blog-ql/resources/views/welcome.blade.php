<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BlogQL</title>

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>

<body class="antialiased">
<button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button
</button>
<div id="app">
    <example-component></example-component>
</div>

</body>

</html>
