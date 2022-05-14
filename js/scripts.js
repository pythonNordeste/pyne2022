window.onload = function() { 
    // MODAL
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");

    function closeModal() {
        modal.style.display = "none";
        modalImg.src = "";
        modalCaption.innerHTML = "";
    }

    const closeModalElem = document.querySelectorAll(".close-modal");
    closeModalElem.forEach(function(elem) {
        elem.onclick = closeModal;
    })

    modal.onclick = function(event) {
        if(modal.isSameNode(event.target) && window.getComputedStyle(modal).display != 'none') 
            closeModal();
    }

    // CAROUSEL
    const slider = document.querySelector(".items");
    const slides = slider.querySelectorAll(".item");
    const button = slider.querySelectorAll(".button");
    const slidesImages = slider.querySelectorAll(".item img");

    if(slider && slides) {
        for (let i = 0; i < slidesImages.length; i++) {
            if(slidesImages[i].classList.contains("clickable")) {
                slidesImages[i].onclick = function(e) {
                    window.location = e.target.dataset.href
                };
            }
            else if(slidesImages[i].classList.contains("open-modal")) {
                slidesImages[i].classList.add("cursor-pointer")
                slidesImages[i].onclick = function() {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    modalCaption.innerHTML = this.alt;
                }
            }
        }

        let current = Math.floor(Math.random()*slides.length);
        let prev = current > 0 ? current - 1 : slides.length - 1;
        let next = current < slides.length - 1 ? current + 1 : 0;

        const update = () => {
        slides.forEach(it => {
            it.classList.remove("active");
            it.classList.remove("prev");
            it.classList.remove("next");
        });
        
        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
        }

        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
        }

        const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
        const gotoNext = () => current < slides.length - 1 ? gotoNum(current + 1) : gotoNum(0);

        const gotoNum = number => {
            current = number;
            prev = current > 0 ? current - 1 : slides.length - 1;
            next = current < slides.length - 1 ? current + 1 : 0;
            
            update();
        }
        update();
    }


    // RABO COBRACAJU
    const raboCobracaju = document.getElementById('rabo');
    const raboCobracajuObj = {
        container: raboCobracaju,
        path: 'rabo.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: "Rabo da Cobra Caju",
    }

    let bodymovinInstanceRabo = null;
    const loadRaboCobracaju = function() {
        raboCobracaju.innerHTML = "";
        bodymovinInstanceRabo = bodymovin.loadAnimation(raboCobracajuObj)
    }
    loadRaboCobracaju()

    // DARKMODE
    const btnDarkmode = document.getElementById("btnDarkmode");
    btnDarkmode.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle("noturno")
        callLoadFunction()
    })
    
    // FALE CONOSCO
    const divCampos = document.getElementById("campos");
    const divMsgForm = document.getElementById("mensagem-sucesso");
    const btnForm = document.getElementById("enviar-form")
    const msgTextarea = document.getElementById("msg");
    const emailInput = document.getElementById("email");
    const assuntoInput = document.getElementById("assunto");

    btnForm.addEventListener("click", function(event) {
        event.preventDefault();
        
        btnForm.disabled = true;
        let validForm = true;

        const formData = {};
        formData["assunto"] = assuntoInput.value?.trim();
        formData["mensagem"] = msgTextarea.value?.trim();
        formData["email"] = emailInput.value?.trim();
        
        if(!formData["email"]?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))   {
            emailInput.classList.add('error')
            validForm = false;
        }
        else 
            emailInput.classList.remove('error')
        
        if(!formData["assunto"]){
            assuntoInput.classList.add('error')
            validForm = false;
        }
        else
            assuntoInput.classList.remove('error')
        
        if(!formData["mensagem"]){
            msgTextarea.classList.add('error')
            validForm = false;
        }
        else
            msgTextarea.classList.remove('error')

        if(validForm) {
            console.log("Enviando e-mail...");
            var url = 'https://script.google.com/macros/s/AKfycbwstFWAQ-mk9nXoTJPOBOClAlcRbnUwmzNlXUdwp0f1Nonps1hVG_W2hrlkm394XmO67A/exec';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log("E-mail enviado.");
                    divCampos.classList.add("display-none")
                    divMsgForm.classList.remove("display-none")
                }
            };
            var encoded = Object.keys(formData).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(formData[k]);
            }).join('&');
            xhr.send(encoded);
        }
        else 
            btnForm.disabled = false;
    });
} 