var isMonthly = 0;

function toggleMobileMenu() {
    var mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('show-mobile-menu');
}

function handleSelectChange() {
    var selectedOption = document.getElementById('donorType').value;

    document.getElementById('particularFields').classList.add('hidden');

    var inputsparticular = document.getElementById('particularFields').getElementsByTagName('input');
    for (var i = 0; i < inputsparticular.length; i++) {
        inputsparticular[i].disabled = true;
    }

    document.getElementById('empresaFields').classList.add('hidden');
    var inputsempresa = document.getElementById('empresaFields').getElementsByTagName('input');
    for (var i = 0; i < inputsempresa.length; i++) {
        inputsempresa[i].disabled = true;
    }

    if (selectedOption === 'particular') {
        document.getElementById('particularFields').classList.remove('hidden');
        for (var i = 0; i < inputsparticular.length; i++) {
            inputsparticular[i].disabled = false;
        }
        
    } else if (selectedOption === 'empresa') {
        document.getElementById('empresaFields').classList.remove('hidden');
        for (var i = 0; i < inputsempresa.length; i++) {
            inputsempresa[i].disabled = false;
        }
        
    }
}

function handleRadioChange() {
    var uniqueRadio = document.querySelector('input[name="donationType"][value="unique"]');
    var inputdiv = document.getElementById('address');
    var input = document.getElementById('addressinput');
    
    var monthlyRadio = document.querySelector('input[name="donationType"][value="monthly"]');
    input.disabled = true;
    inputdiv.classList.add('hidden');

    if (uniqueRadio.checked) {
        input.disabled = true;
        inputdiv.classList.add('hidden');

        isMonthly = 0;
    } else if (monthlyRadio.checked) {
        input.disabled = false;
        inputdiv.classList.remove('hidden');
        isMonthly = 1;
    }
}


document.getElementById('donorType').addEventListener('change', handleSelectChange);

handleSelectChange();

document.getElementById("donationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    if (!event.target.checkValidity()) {
        alert("Please fill in all required fields.");
    } else {
        const customAmountInput = document.getElementById('donationAmountCustom');
        const selectedRadio = document.querySelector('input[name="donationAmount"]:checked');

        var donationAmount;

        if (customAmountInput.value != "" || customAmountInput.value != 0) {
            donationAmount = customAmountInput.value;
        } else if (selectedRadio) {
            donationAmount = selectedRadio.value;
        } else {
            alert("Please select a donation amount.");
            return false;
        }

        if(isMonthly == 0)
        {
            if(donationAmount > 40)
            {
                var pessoas = Math.trunc(donationAmount / (2 * 1.5));
                var content = "O seu donativo permiterá alimentar diariamente " + pessoas +  " pessoas";
                openPopup(content);
            }
            else {
                var refeicoes = Math.trunc(donationAmount/ 1.5);
    
                var content = "O seu donativo permitirá fornecer aproximadamente " + refeicoes +" refeições";
                openPopup(content);
            }
        }
        else
        {
            if(donationAmount > 90)
            {
                var pessoas = Math.trunc(donationAmount/(30*(2 * 1.5)));
                var content = "O seu donativo permitirá alimentar " + pessoas + " pessoas durante este mês";
                openPopup(content);
            }
            else {
                var refeicoes = Math.trunc(donationAmount / (2 * 1.5));
    
                var content = "O seu donativo permitirá alimentar uma pessoa durante "+ refeicoes+" dias";
                openPopup(content);
            }
        }
        
    }
});

function openPopup(content) {
    var popupContainer = document.getElementById('popup-container');
    var popupContent = document.getElementById('popup-content');

    popupContent.textContent = content || 'Default content';

    popupContainer.style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
}
