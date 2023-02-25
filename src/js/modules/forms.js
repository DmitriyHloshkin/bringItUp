import PostData from './post/post.js';

export default class Forms {
  constructor({ form = null, btnSend = null, postOptions }) {
    this.form = document.querySelector(form);
    this.inputs = this.form.querySelectorAll('[name]');
    this.btnSend = this.form.querySelector(btnSend);
    this.stateForm = new Map();
    this.postData = new PostData(postOptions);
    this.dataForm = null;

  }

  init() {
    const createValidBlok = parentInput => {
      const validBlock = document.createElement('div');

      validBlock.classList.add('validation-block');
      parentInput.appendChild(validBlock);
    };

    this.postData.init();

    this.inputs.forEach( input => {
      const parentInput = input.parentNode,
            typeInput = input.getAttribute('name'); 

      createValidBlok(parentInput);
      this.saveFirstState(input, {
        status: 0,
        message: 'empty field',
      });    

      switch (typeInput) {
        case 'name': 
          input.addEventListener('input', this.handleNameInput.bind(this, input));
          break;

        case 'position': 
          input.addEventListener('input', this.handlePositionInput.bind(this, input));
          break;

        case 'email': 
          input.addEventListener('input', this.handleEmailInput.bind(this, input));
          break;

        case 'phone': 
          input.addEventListener("input", this.mask);   
          input.addEventListener("focus", this.mask);
          input.addEventListener("blur", this.mask);
          input.addEventListener("keydown", this.mask);
          input.addEventListener('input', this.handlePhoneInput.bind(this, input));
          break;

        case 'date': 
          input.addEventListener("input", this.handleDateInput.bind(this, input));
      }

    });

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!this.checkForm()) return;

      this.showLoader();
      this.showProgressSend('Sending...');

      try {
        const response = await this.postData.sendPost(this.getDataForm());
        if(!response.ok) throw new Error('bad status');
        const result = await response.json();
        this.showProgressSend('Sending successful');
        this.resetForm();

      } catch (error) {
        this.showProgressSend('Failed to send, try again');
        
      } finally {
        setTimeout(this.closeLoader.bind(this), 1000);
      }
      
    });
  }

  saveFirstState(field, state) {
    if (field.type === 'select-one') {
      state.status = 1;
      state.message = 'field correct';
    }
    this.stateForm.set(field, state);
  }

  getDataForm() {
    const params = new URLSearchParams(new FormData(this.form)),
          dataObject = Object.fromEntries(params.entries());

    return dataObject;
  }

  // name date
  handleDateInput(input) {
    const validResult = this.checkDate(input);

    this.stateForm.set(input, validResult);
    this.showResultValid({ input, ...validResult});
  }

  checkDate(input) {
    const date = input.value,
          result = {};
    
    result.status = 1;
    result.message = 'field correct';

    if(!date) {
      result.message = 'empty field';
      result.status = 0;
      return result;
    }

    return result;
  }

  // name inputs
  handleNameInput(input) {
    const validResult = this.checkName(input);

    this.stateForm.set(input, validResult);
    this.showResultValid({ input, ...validResult});
  }
  checkName(input) {
    const name = input.value,
          result = {};
    
    result.status = 1;
    result.message = 'field correct';

    if(!name) {
      result.message = 'empty field';
      result.status = 0;
      return result;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      result.message = 'field must contain only Latin characters';
      result.status = 0;
      return result;
    }

    return result;
  }

  // name position
  handlePositionInput(input) {
    const validResult = this.checkPosition(input);

    this.stateForm.set(input, validResult);
    this.showResultValid({ input, ...validResult});
  }
  checkPosition(input) {
    const position = input.value,
          result = {};

    result.status = 1;
    result.message = 'field correct';

    if(!position) {
      result.message = 'empty field';
      result.status = 0;
      return result;
    }

    return result;
  }

  // name email
  handleEmailInput(input) {
    const validResult = this.checkEmail(input);

    this.stateForm.set(input, validResult);
    this.showResultValid({ input, ...validResult});
  }
  checkEmail(input) {
    const email = input.value,
          result = {};

    result.status = 1;
    result.message = 'field correct';

    if(!email) {
      result.message = 'empty field';
      result.status = 0;
      return result;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      result.message = 'invalid email format';
      result.status = 0;
      return result;
    }

    return result;
  }

  // name phone
  handlePhoneInput(input) {
    const validResult = this.checkPhone(input);

    this.stateForm.set(input, validResult);
    this.showResultValid({ input, ...validResult});
  }

  checkPhone(input) {
    const phone = input.value,
          result = {};

    result.status = 1;
    result.message = 'field correct';

    if(phone.replace(/\D/g, "").length !== 11) {
      result.message = 'invalid phone format';
      result.status = 0;
      return result;
    }

    return result;
  }

  mask(event) {
    
    event.keyCode && (event.keyCode === event.keyCode);
    let pos = this.selectionStart;

    if (pos < 2) event.preventDefault();

    let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });

    i = newValue.indexOf("_");
    if (i !== -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }

    let reg = matrix
      .substring(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");

    reg = new RegExp("^" + reg + "$");

    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (event.keyCode > 47 && event.keyCode < 58)
    ) {
      this.value = newValue;
    }

    if (event.type === "blur" && this.value.length < 5) {
      this.value = "";
    }

  }

  // forms
  checkForm() {
    const invalidInputs =  Array.from(this.stateForm.entries())
                                .filter(elem => {
                                  if (elem[1].status === 0) return elem;
                                })
                                .map( elem => {
                                  return {
                                    input: elem[0],
                                    status: elem[1].status,
                                    message: elem[1].message,
                                  };
                                });

    if (invalidInputs.length === 0) return true;

    invalidInputs.forEach( data => {
      this.showResultValid(data);

      this.showNoValidAnimation(data.input.parentNode); 
    });                            

    
  }

  resetForm() {
    this.form.reset();
    this.form.querySelectorAll('.validation-block').forEach(block => {
      block.textContent = '';
    });

    this.stateForm = new Map();
    
    this.inputs.forEach( input => {
      this.saveFirstState(input, {
        status: 0,
        message: 'empty field',
      });
    });

  }
  

  showResultValid({ input, status, message }) {
    const validBlock = input.parentNode.querySelector('.validation-block');

    if (!validBlock) return;

    validBlock.style.display = 'block';
    validBlock.style.color = status === 0 ? '#FF4500' : '#A2C95F';
    validBlock.textContent = message;
    
  }

  showNoValidAnimation(elem) {    
    const keyFrames = [
      {transform: `translate3d(0, 0, 0)`},
      {transform: `translate3d(-5px, 0, 0)`},
      {transform: `translate3d(5px, 0, 0)`},
      {transform: `translate3d(0, 0, 0)`}
    ];

    const options = {
      duration: 500,
      iterations: 2,
    };

    elem.animate(keyFrames, options);
  }

  showLoader() {    
    const btnWidth = window.getComputedStyle(this.btnSend).width,
          btnHeight = window.getComputedStyle(this.btnSend).height;

    this.btnSend.style.display = 'none';
    createLoader(this.btnSend);

    function createLoader(btn) {
      const loader = document.createElement('div'),
            loaderImg = document.createElement('img'),
            wrapperBlock = btn.parentNode;

      loader.classList.add('loader');
      loader.style.width = btnWidth;
      loader.style.height = btnHeight;
      loader.style.position = 'relative';

      loaderImg.src = '../img/loader/ajax-loader.gif';
      loaderImg.style.cssText = `width: 50px;
                                height: 50px;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);`;

      loader.append(loaderImg);
      wrapperBlock.prepend(loader);
    }

  }

  closeLoader() {
    this.btnSend.style.display = 'block';

    setTimeout(() => this.showProgressSend(''), 2000);

    this.form.querySelector('.loader')?.remove();
  }

  showProgressSend(text) {
    const progressTitle = this.form.querySelector('.progress-send');

    progressTitle.textContent = text;

  }

}