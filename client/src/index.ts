const getComponent = async () => {
    const element = document.createElement('div');
    const {default: _} = await import(/* webpackChunkName: "lodash" */'lodash');

    element.innerHTML = `<h1>${_.join(['hello', 'bitches'], ' ')}</h1>`;
    return element;
};

getComponent().then(component => {
    document.body.appendChild(component);
});