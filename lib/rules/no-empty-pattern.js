/**
 * @fileoverview Rule to disallow an empty pattern
 * @author Alberto Rodríguez
 * @copyright 2015 Alberto Rodríguez. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow empty destructuring patterns",
            category: "Best Practices",
            recommended: true
        },

        schema: []
    },

    create: function(context) {
        return {
            "ObjectPattern": function(node) {
                if (node.properties.length === 0) {
                    context.report(node, "Unexpected empty object pattern.");
                }
            },
            "ArrayPattern": function(node) {
                if (node.elements.length === 0) {
                    context.report(node, "Unexpected empty array pattern.");
                }
            }
        };
    }
};
