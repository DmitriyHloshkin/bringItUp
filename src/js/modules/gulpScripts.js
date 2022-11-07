/* Проверим поддерживает ли браузер webp формат изображений
  если да - установим соответствующий класс для body который будет
  указывать что мы можем на странице использовать webp формат
*/
function checkWebp() {

  const webP = new Image();
  webP.onload = webP.onerror = function () {
    checkSupport(webP.height == 2);
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';

  function checkSupport (support) {
    const className = support ? 'webp' : 'no-webp';
    document.querySelector('body').classList.add(className);
  }

}

export { checkWebp };

