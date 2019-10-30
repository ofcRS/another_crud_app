const getComponent = () => {
    const element = document.createElement('div');
    element.innerHTML = `<h1>'hello', 'Bitches'</h1>`;

    element.onclick = () => {
        import('./print').then((module) => {
            const print = module.default;

            print();
        });
    };

    return element;
};

document.body.appendChild(getComponent());