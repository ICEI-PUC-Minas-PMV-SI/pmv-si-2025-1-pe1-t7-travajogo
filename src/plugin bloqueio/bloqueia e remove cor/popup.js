document.addEventListener("DOMContentLoaded", function () {
    const addSiteButton = document.getElementById("addSiteButton");
    const siteForm = document.getElementById("siteForm");
    const siteUrlInput = document.getElementById("siteUrl");
    const siteActionSelect = document.getElementById("siteAction");
    const saveSiteButton = document.getElementById("saveSite");
    const siteList = document.getElementById("siteList");

    // Mostrar formulário ao clicar em "Adicionar Site à Lista"
    addSiteButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentUrl = new URL(tabs[0].url).origin;
            siteUrlInput.value = currentUrl;
            siteForm.style.display = "block";
        });
    });

    // Salvar site na lista com a ação escolhida
    saveSiteButton.addEventListener("click", function () {
        const siteUrl = siteUrlInput.value;
        const action = siteActionSelect.value;

        if (siteUrl) {
            chrome.storage.sync.get("siteRules", (data) => {
                let siteRules = data.siteRules || [];

                if (!siteRules.some(site => site.url === siteUrl)) {
                    siteRules.push({ url: siteUrl, action: action });
                    chrome.storage.sync.set({ siteRules: siteRules });
                    updateSiteList(siteRules);
                }
            });
            siteForm.style.display = "none"; // Esconde o formulário
        }
    });

    // Atualizar a lista de sites na interface
    function updateSiteList(sites) {
        siteList.innerHTML = "";
        sites.forEach((site, index) => {
            const li = document.createElement("li");

            // Botão de remover site
            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.classList.add("remove");
            removeButton.onclick = function () {
                sites.splice(index, 1);
                chrome.storage.sync.set({ siteRules: sites });
                updateSiteList(sites);
            };

            // Dropdown para trocar ação do site
            const actionSelect = document.createElement("select");
            actionSelect.innerHTML = `
                <option value="block" ${site.action === "block" ? "selected" : ""}>Bloquear</option>
                <option value="grayscale" ${site.action === "grayscale" ? "selected" : ""}>Remover Cores</option>
            `;
            actionSelect.addEventListener("change", function () {
                sites[index].action = actionSelect.value;
                chrome.storage.sync.set({ siteRules: sites });
                updateBlockedSites();
            });

            // Nome do site
            const siteText = document.createElement("span");
            siteText.textContent = site.url;

            li.appendChild(removeButton);
            li.appendChild(siteText);
            li.appendChild(actionSelect);
            siteList.appendChild(li);
        });
    }

    // Carregar lista de sites ao abrir popup
    chrome.storage.sync.get("siteRules", (data) => {
        updateSiteList(data.siteRules || []);
    });
});
