document.addEventListener('DOMContentLoaded', function () {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const uploadedFiles = document.getElementById('uploadedFiles');
    const multiple = fileInput.hasAttribute('multiple');
    const acceptTypes = fileInput.accept.split(',').map(type => type.trim());
    const defaultImage = '/path/to/default/image.png';
    const maxFileSize = 15 * 1024 * 1024;
    const maxFiles = 6;

    // Abre el selector de archivos cuando se hace clic en la zona de dropzone
    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    // Manejador de archivos cuando se arrastran a la zona
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Selección de archivos con el input
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    // Manejar los archivos seleccionados y mostrarlos en la vista
    function handleFiles(files) {
        let filesArray = Array.from(files); // Convertir la colección de archivos a un array
        filesArray = filesArray.filter(file => {
            return acceptTypes.includes(file.type) && file.size < maxFileSize;
        });

        if (filesArray.length === 0) {
            return alert('Algunos archivos no son válidos. Por favor selecciona archivos válidos.');
        }

        if (multiple) {
            filesArray = filesArray.slice(0, maxFiles);
        } else {
            // Si no es múltiple, tomar solo el primer archivo
            filesArray = [filesArray[0]];
        }
        // Mostrar los archivos
        displayFilesWithPreview(filesArray);

        // Asignar los archivos al input de formulario real de forma correcta
        // Si no es múltiple, asignar solo el primer archivo
        const fileList = new DataTransfer();
        filesArray.forEach(file => fileList.items.add(file));

        fileInput.files = fileList.files;
    }

    // Mostrar los archivos seleccionados
    function displayFiles(files) {
        uploadedFiles.innerHTML = ''; // Limpiar los archivos ya mostrados

        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('bg-gray-100', 'dark:bg-gray-700', 'px-2', 'py-1', 'rounded', 'shadow', 'line-clamp-1', 'text-center');
            fileItem.innerText = file.name;
            uploadedFiles.appendChild(fileItem);
        });
    }

    function displayFilesWithPreview(files) {
        uploadedFiles.innerHTML = ''; // Limpiar los archivos ya mostrados

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('w-full', 'bg-gray-100', 'dark:bg-gray-700', 'p-2', 'rounded', 'shadow', 'flex', 'items-center', 'space-x-3');

            const preview = document.createElement('img');
            preview.classList.add('w-16', 'h-16', 'aspect-square', 'object-cover', 'rounded');
            
            if (file.type.startsWith('image/')) {
                // Si el archivo es una imagen, mostrar su vista previa
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Si no es una imagen, mostrar una imagen por defecto
                preview.src = defaultImage;
            }

            const fileName = document.createElement('span');
            fileName.classList.add('text-sm', 'line-clamp-2');
            fileName.innerText = file.name;

            fileItem.appendChild(preview);
            fileItem.appendChild(fileName);

            uploadedFiles.appendChild(fileItem);
        });
    }
});