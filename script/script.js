const fetchImageUrls = async () => {
    const imageUrls = [];
    const regex = /(?<=img-cover.{60,90}\s)<img\ssrc="(.*)" alt/g;
    const baseUrl = location.href.replaceAll("?page=1", "");
    const batchSize = 40;
    const maxPages = 80;

    // Expresión regular para eliminar el patrón "_XXXxYYY" antes de la extensión (para obtener la img en tamaño completo).
    const cleanupRegex = /_\d+x\d+/g;

    const fetchBatch = async (startPage, endPage) => {
        const fetchPromises = [];
        console.log(`Fetching pages ${startPage} to ${endPage}...`);
        for (let page = startPage; page <= endPage; page++) {
            const url = `${baseUrl}?page=${page}`;
            fetchPromises.push(
                fetch(url).then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else if (response.status === 404) {
                        throw new Error(`404 at page ${page}`);
                    } else {
                        throw new Error(
                            `Failed to fetch ${url}: ${response.statusText}`
                        );
                    }
                })
            );
        }

        try {
            const responses = await Promise.all(fetchPromises);

            responses.forEach((text) => {
                let match;
                while ((match = regex.exec(text)) !== null) {
                    let imageUrl = match[1];
                    imageUrl = imageUrl.replace(cleanupRegex, '');
                    imageUrls.push(imageUrl);
                }
            });
        } catch (error) {
            if (error.message.includes("404")) {
                console.warn(error.message);
                // Detiene la búsqueda si se encuentra un error 404
                return false;
            } else {
                console.error("Error fetching pages:", error);
            }
        }

        return true;
    };

    let startPage = 1;
    let continueFetching = true;

    while (continueFetching && startPage <= maxPages) {
        const endPage = Math.min(startPage + batchSize - 1, maxPages);
        continueFetching = await fetchBatch(startPage, endPage);
        startPage += batchSize;
    }

    return imageUrls;
};

fetchImageUrls()
    .then((imageUrls) => {
        console.log("Extracted Image URLs:", imageUrls);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
