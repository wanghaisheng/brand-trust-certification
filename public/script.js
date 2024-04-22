// 获取用户的语言设置
const userLang = navigator.language || navigator.userLanguage;

// 定义支持的语言列表
const supportedLangs = ["zh-CN", "en-US"];

// 检查用户语言是否在支持的语言列表中,如果不在,则默认为英文
let currentLang = supportedLangs.includes(userLang) ? userLang : "en-US";

// 加载对应的配置文件
loadLanguage(currentLang);

// 添加语言切换事件监听器
const langSelect = document.getElementById("lang-select");
langSelect.value = currentLang;
langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  loadLanguage(currentLang);
});

// 加载语言文件并更新页面内容
function loadLanguage(lang) {
  fetch(`${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      // 更新页面中的文本内容
      document.title = data.title;
      updateContent("[data-i18n]", "textContent", data);
      updateContent("[data-i18n-placeholder]", "placeholder", data);
    })
    .catch((error) => {
      console.error("Failed to load language file:", error);
    });
}

// 更新页面内容的函数
function updateContentinvalid2(selector, property, data) {
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset.i18n || element.dataset.i18nPlaceholder;
    if (key && data[key]) {
      element[property] = data[key];
    }
  });
}

// wont work method
function updateContentInvalid(selector, property, data) {
  console.log("Updating content with selector:", selector);
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset.i18n || element.dataset.i18nPlaceholder;
    console.log("Updating element with key:", key);
    console.log("Full data object:", data);
    if (key && key in data) {
      console.log("Data for key:", data[key]);
      element[property] = data[key];
      console.log("Updated element content:", element[property]);
    } else {
      console.log("Key not found in data:", key);
    }
  });
}

// 更新页面内容的函数
function updateContent(selector, property, data) {
  console.log("Updating content with selector:", selector);
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.dataset.i18n || element.dataset.i18nPlaceholder;
    console.log("Updating element with key:", key);
    if (key) {
      const keyParts = key.split(".");
      let currentData = data;
      for (let i = 0; i < keyParts.length; i++) {
        const part = keyParts[i];
        if (
          currentData &&
          typeof currentData === "object" &&
          part in currentData
        ) {
          currentData = currentData[part];
        } else {
          console.log("Key not found in data:", key);
          return;
        }
      }
      element[property] = currentData;
      console.log("Updated element content:", element[property]);
    }
  });
}
