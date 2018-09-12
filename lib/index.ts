export class PaginationParser {

    static getPaginationModel(typeDefs: string, paginationTypes = []): string {
        let typeDefsWithPaging = typeDefs;
        paginationTypes.forEach( paginationType => {
            let toBeReplaced = '';
            for (var i=typeDefs.indexOf(paginationType.functionName);i<typeDefs.length;i++) {
                if (typeDefs[i] == '\n') {
                    break;
                } else {
                    toBeReplaced += typeDefs[i];
                }
            }
            typeDefsWithPaging = typeDefsWithPaging.replace(toBeReplaced, toBeReplaced.replace(' ' + paginationType.objectType, ' ' + paginationType.objectType + 'Pager'));
            typeDefsWithPaging += '\ntype '+ paginationType.objectType +'Pager {\n  data: ['+ paginationType.objectType +']\n  pagination: Pagination\n}\n';

        });

        return typeDefsWithPaging;
    }

}