document.addEventListener('DOMContentLoaded', () => {
    const form = document.createElement('form');
    form.classList.add('feedback-form');
    form.setAttribute('autocomplete', 'off');

    const labelEmail = createLabel('Email');
    const inputEmail = createInput('email', 'Email', true);

    const labelMessage = createLabel('Message');
    const textareaMessage = createTextarea('message', 'Message', 8);

    const submitButton = createButton('Submit', 'submit');

    appendChildren(form, [labelEmail, inputEmail, labelMessage, textareaMessage, submitButton]);
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

function createLabel(textContent) {
    const label = document.createElement('label');
    label.textContent = textContent;
    return label;
}

function createInput(name, placeholder, autofocus = false) {
    const input = document.createElement('input');
    input.setAttribute('type', 'email');
    input.setAttribute('name', name);
    if (autofocus) {
        input.setAttribute('autofocus', '');
    }
    return input;
}

function createTextarea(name, placeholder, rows) {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', name);
    textarea.setAttribute('rows', rows);
    return textarea;
}

function createButton(textContent, type) {
    const button = document.createElement('button');
    button.setAttribute('type', type);
    button.textContent = textContent;
    return button;
}

function appendChildren(parent, children) {
    const fragment = document.createDocumentFragment();
    children.forEach(child => fragment.appendChild(child));
    parent.appendChild(fragment);
}
