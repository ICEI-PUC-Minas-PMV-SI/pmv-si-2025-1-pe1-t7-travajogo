// Função para aplicar regras a todas as abas abertas
function applyRulesOnAllTabs() {
    chrome.storage.sync.get("siteRules", (data) => {
        const siteRules = data.siteRules || [];
        
        chrome.tabs.query({}, (tabs) => {  // Verifica todas as abas abertas
            tabs.forEach((tab) => {
                const currentUrl = new URL(tab.url).origin;
                const rule = siteRules.find((site) => site.url === currentUrl);

                if (rule) {
                    // Se for bloqueio, aplica o bloqueio
                    if (rule.action === "block") {
                        chrome.tabs.update(tab.id, { url: "about:blank" });
                    } 
                    // Se for remover cor, aplica o filtro de escala de cinza
                    else if (rule.action === "grayscale") {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            function: applyGrayScale
                        });
                    }
                }
            });
        });
    });
}

// Aplique as regras assim que a extensão for instalada ou recarregada
chrome.runtime.onInstalled.addListener(() => {
    applyRulesOnAllTabs();  // Aplica as regras nas abas abertas ao instalar
});

// Listener para monitorar quando uma aba é carregada
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {  // Quando a aba estiver carregada
        applyRulesToTab(tabId, tab.url);  // Aplica as regras na nova aba
    }
});

// Função para aplicar regras de bloqueio ou remoção de cor para uma aba específica
function applyRulesToTab(tabId, url) {
    chrome.storage.sync.get("siteRules", (data) => {
        const siteRules = data.siteRules || [];
        const currentUrl = new URL(url).origin;
        const rule = siteRules.find((site) => site.url === currentUrl);

        if (rule) {
            // Se for bloqueio, aplica o bloqueio
            if (rule.action === "block") {
                chrome.tabs.update(tabId, { url: "about:blank" });
            } 
            // Se for remover cor, aplica o filtro de escala de cinza
            else if (rule.action === "grayscale") {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    function: applyGrayScale
                });
            }
        }
    });
}

// Função para aplicar filtro de escala de cinza
function applyGrayScale() {
    document.body.style.filter = "grayscale(100%)";
}

// Ouvir mudanças nos sites armazenados e aplicar as regras quando necessário
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.siteRules) {
        applyRulesOnAllTabs();  // Aplica as regras em todas as abas abertas quando há alteração
    }
});
