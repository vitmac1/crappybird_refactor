export async function preloadImages(imageList) {
    const promises = imageList.map((name) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `/assets/${name}`;
            img.onload = () => resolve({ name, img });
            img.onerror = (err) => reject(`Erro ao carregar: ${name}`);
        });
    });

    const results = await Promise.all(promises);

    // Transforma a lista em um mapa para acesso rápido
    const imageMap = {};

    results.forEach(({ name, img }) => {
        imageMap[name] = img;
    });

    return imageMap;
}
