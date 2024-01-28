

document.addEventListener('DOMContentLoaded', () => {

    const form = document.createElement('form');
    form.classList.add('feedback-form');
    form.setAttribute('autocomplete', 'off');

    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email';
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('name', 'email');
    inputEmail.setAttribute('autofocus', '');

    const labelMessage = document.createElement('label');
    labelMessage.textContent = 'Message';
    const textareaMessage = document.createElement('textarea');
    textareaMessage.setAttribute('name', 'message');
    textareaMessage.setAttribute('rows', '8');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';

    
    labelEmail.appendChild(inputEmail);
    labelMessage.appendChild(textareaMessage);
    
    form.appendChild(labelEmail);
    form.appendChild(labelMessage);
    form.appendChild(submitButton);

    
    document.body.appendChild(form);

    
    form.addEventListener('input', (event) => {
        const fieldValue = event.target.value.trim();
        const fieldName = event.target.name;

        localStorage.setItem("feedback-form-state", JSON.stringify({
            ...JSON.parse(localStorage.getItem("feedback-form-state") || '{}'),
            [fieldName]: fieldValue,
        }));
    });

    const savedData = JSON.parse(localStorage.getItem("feedback-form-state") || '{}');
    form.elements.email.value = savedData.email || '';
    form.elements.message.value = savedData.message || '';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (form.elements.email.value && form.elements.message.value) {
            console.log({
                email: form.elements.email.value,
                message: form.elements.message.value,
            });

            localStorage.removeItem("feedback-form-state");

        form.elements.email.value = '';
        form.elements.message.value = '';
        }
    });
});


