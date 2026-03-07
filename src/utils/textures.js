import * as THREE from 'three';

export function createCheckerboardTexture(color1, color2, size = 512, divisions = 8) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    const step = size / divisions;
    for (let y = 0; y < divisions; y++) {
        for (let x = 0; x < divisions; x++) {
            context.fillStyle = (x + y) % 2 === 0 ? color1 : color2;
            context.fillRect(x * step, y * step, step, step);
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
}

export function createGridTexture(bgColor, lineColor, size = 512, divisions = 10) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    context.fillStyle = bgColor;
    context.fillRect(0, 0, size, size);

    context.strokeStyle = lineColor;
    context.lineWidth = 4;

    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
        context.beginPath();
        context.moveTo(i * step, 0);
        context.lineTo(i * step, size);
        context.stroke();

        context.beginPath();
        context.moveTo(0, i * step);
        context.lineTo(size, i * step);
        context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    return texture;
}

export function createNoiseTexture(colorBase, intensity = 20, size = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    context.fillStyle = colorBase;
    context.fillRect(0, 0, size, size);

    const imgData = context.getImageData(0, 0, size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * intensity;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }

    context.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
}
