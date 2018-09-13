export class PaginationParser {

    static getPaginationModel(typeDefs: string, paginationTypes = []): string {
        let typeDefsWithPaging = typeDefs;
        paginationTypes.forEach( paginationType => {
            let toBeReplaced = '';
            let params = ', ';
            let isParentesisOpened = false;
            for (var i=typeDefs.indexOf(paginationType.functionName);i<typeDefs.length;i++) {
                if (typeDefs[i] == '\n') {
                    break;
                } else {
                    if (typeDefs[i] == '(' ) {
                        isParentesisOpened = true;
                    } else if (typeDefs[i] == ')')  {
                        isParentesisOpened = false;
                    } else if (!isParentesisOpened) {
                        toBeReplaced += typeDefs[i];
                    } else if (isParentesisOpened) {
                        params += typeDefs[i];
                    }
                }
            }
            typeDefsWithPaging = typeDefsWithPaging.replace(toBeReplaced, toBeReplaced.replace(' [' + paginationType.objectType + ']', ' ' + paginationType.objectType + 'Pager'));
            typeDefsWithPaging += '\ntype '+ paginationType.objectType +'Pager {\n  data: ['+ paginationType.objectType +']\n  pagination: Pagination\n}\n';
            typeDefsWithPaging = typeDefsWithPaging.replace(paginationType.functionName, paginationType.functionName + '(pageIndex: Int, pageSize: Int ' + params + ')');
        });

        return typeDefsWithPaging;
    }

}