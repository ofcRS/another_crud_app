module.exports = {
    plugin: (schema, documents, config) => {
        const typesMap = schema.getTypeMap();

        console.log(
            documents
                .map(doc => {
                    const docsNames = doc.document.definitions.map(
                        def => def.name.value
                    );

                    return `File ${doc.location} contains: ${docsNames.join(
                        ', '
                    )}`;
                })
                .join('\n')
        );

        return '';
    },
};
