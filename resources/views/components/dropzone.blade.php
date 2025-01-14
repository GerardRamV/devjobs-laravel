@props([
    'disabled' => false, 
    'multiple' => false, 
    'accept' => 'image/png,image/jpeg,image/webp', 
    'name' => 'files'
])

<label id="dropzone" for="images" class="mt-1 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
    <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Haz click o arrastra para subir</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ $slot }} , máximo 15MB por archivo. @if($multiple) Máximo 6 archivos @endif 
        </p>
    </div>
    <input id="fileInput" type="file" 
           class="hidden"
           name="{{ $name }}"
           accept="{{ $accept }}"
           @if($multiple) multiple @endif
           @disabled($disabled)
           {{ $attributes->merge() }} />
</label>

<!-- Mostrar archivos seleccionados -->
<div id="uploadedFiles" class="grid grid-cols-1 mt-4 gap-2 @if($multiple) md:grid-cols-2 @endif"></div>

<!-- resources/views/layouts/app.blade.php -->
@vite(['resources/js/dropzone.js'])