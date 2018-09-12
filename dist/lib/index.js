"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaginationParser = /** @class */ (function () {
    function PaginationParser() {
    }
    PaginationParser.getPaginationModel = function (typeDefs, paginationTypes) {
        if (paginationTypes === void 0) { paginationTypes = []; }
        var typeDefsWithPaging = typeDefs;
        paginationTypes.forEach(function (paginationType) {
            var toBeReplaced = '';
            for (var i = typeDefs.indexOf(paginationType.functionName); i < typeDefs.length; i++) {
                if (typeDefs[i] == '\n') {
                    break;
                }
                else {
                    toBeReplaced += typeDefs[i];
                }
            }
            typeDefsWithPaging = typeDefsWithPaging.replace(toBeReplaced, toBeReplaced.replace(' ' + paginationType.objectType, ' ' + paginationType.objectType + 'Pager'));
            typeDefsWithPaging += '\ntype ' + paginationType.objectType + 'Pager {\n  data: [' + paginationType.objectType + ']\n  pagination: Pagination\n}\n';
        });
        return typeDefsWithPaging;
    };
    return PaginationParser;
}());
exports.PaginationParser = PaginationParser;
