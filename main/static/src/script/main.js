console.log("hello")

$(document).ready(function() {
    $('#example').DataTable({
    	"ajax" : "/awsec2",
    	"columns": [
            { "data": "productFamily" },
            { "data": "sku" },
            { "data" : "attributes.location"},
            { "data" : "attributes.instanceType"},
            { "data" : "attributes.location"},
            { "data" : "attributes.networkPerformance"}

        ]
    });
} );