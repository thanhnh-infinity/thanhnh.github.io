var input_componets = []
var output_components = []
var operations_depend_classes = []
function buildUpTreeView_Resources(){
  var defaultData = [
          {
            text: 'Parent 1',
            nodes: [
              {
                text: 'Child 1',
                nodes: [
                  {
                    text: 'resource_FreeText',
                  },
                  {
                    text: 'ddd',
                  }
                ]
              },
              {
                text: 'resource_SetOfGeneStrings',
              }
            ]
          },
          {
            text: 'resource_Tree',
            nodes : [
               {
                  text:'resource_speciesTree',
               },
               {
                  text:'resource_geneTree',
               },
               {
                  text:'resource_reconcileTree',
               },
            ]
          },
          {
            text: 'Parent 3',
          },
          {
            text: 'Parent 4',
          },
          {
            text: 'Parent 5',
          }
        ];

    operations_depend_classes = [
       {"local_class_name":"names_resolution_operation","code":200,"list_instances":[{"local_name":"phylotastic_ResolvedScientificNames_GNR_TNRS_GET","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_ResolvedScientificNames_GNR_TNRS_GET"},{"local_name":"phylotastic_ResolvedScientificNames_GNR_TNRS_POST","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_ResolvedScientificNames_GNR_TNRS_POST"},{"local_name":"phylotastic_ResolvedScientificNames_OT_TNRS_GET","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_ResolvedScientificNames_OT_TNRS_GET"},{"local_name":"phylotastic_ResolvedScientificNames_OT_TNRS_POST","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_ResolvedScientificNames_OT_TNRS_POST"}],"uri_class_name":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#names_resolution_operation","type_object_in_list":"instance","status":"success"},
       {"local_class_name":"taxonomy_based_extraction","code":200,"list_instances":[{"local_name":"phylotastic_GetPhylogeneticTree_OT_GET","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_GetPhylogeneticTree_OT_GET"},{"local_name":"phylotastic_GetPhylogeneticTree_OT_POST","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_GetPhylogeneticTree_OT_POST"}],"uri_class_name":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#taxonomy_based_extraction","type_object_in_list":"instance","status":"success"},
       {"local_class_name":"gene_tree_scaling","code":200,"list_instances":[{"local_name":"phylotastic_GeneTree_Scaling","uri":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#phylotastic_GeneTree_Scaling"}],"uri_class_name":"http:\/\/www.cs.nmsu.edu\/~epontell\/CDAO\/cdao.owl#gene_tree_scaling","type_object_in_list":"instance","status":"success"}     
    ]

    var arrTreeData = []
    var treeData = generate_tree_view_data(GLOBAL_HIERARCHY_CLASSES_RESOURCE)
    arrTreeData.push(treeData)
    

    var arrServicesHierarchyData = []
    var servicesHierarchyData = generate_tree_view_data(GLOBAL_HIERARCHY_CLASSES_STRUCTURE_ROOTED)
    arrServicesHierarchyData.push(servicesHierarchyData)

    $('#resource_tree_init').treeview({
          color: "#428bca",
          expandIcon: 'glyphicon glyphicon-chevron-right',
          collapseIcon: 'glyphicon glyphicon-chevron-down',
          nodeIcon: 'glyphicon glyphicon-file',
          multiSelect: false,
          data: arrTreeData,
          onNodeSelected: function(event, node) {
              input_componets.push(node.text)
              //console.log(input_componets)
          },
          onNodeUnselected: function (event, node) {
              var index = input_componets.indexOf(node.text)
              if (index > -1){
                input_componets.splice(index,1)
              }
          }
    });

    $('#resource_tree_goal').treeview({
          color: "#428bca",
          expandIcon: 'glyphicon glyphicon-chevron-right',
          collapseIcon: 'glyphicon glyphicon-chevron-down',
          nodeIcon: 'glyphicon glyphicon-file',
          multiSelect: false,
          data: arrTreeData,
          onNodeSelected: function(event, node) {
              output_components.push(node.text)
              //console.log(input_componets)
          },
          onNodeUnselected: function (event, node) {
              var index = output_components.indexOf(node.text)
              if (index > -1){
                output_components.splice(index,1)
              }
          }
    });

    $('#service_hierarchy_tree').treeview({
          color: "#428bca",
          expandIcon: 'glyphicon glyphicon-chevron-right',
          collapseIcon: 'glyphicon glyphicon-chevron-down',
          nodeIcon: 'glyphicon glyphicon-file',
          multiSelect: false,
          data: arrServicesHierarchyData,
          onNodeSelected: function(event, node) {      
              //console.log("Selected : " + node.text)
              setUp_Select_Operations_HMTL(node.text);
          },
          onNodeUnselected: function (event, node) {
              //console.log("Un-selected : " + node.text)
          }
    });
}

function select_Service_Class_data(service_class_name){
  if (isEmpty(operations_depend_classes) || operations_depend_classes.length <= 0){
      return null
  } else {
      for(var index = 0 ; index < operations_depend_classes.length ; index++){
        var service_class_data = operations_depend_classes[index]
        if (service_class_data.local_class_name.trim().toUpperCase() === service_class_name.trim().toUpperCase()){
            return service_class_data
        }
      } 
      return null
  }
}

function setUp_Select_Operations_HMTL(service_class_name){
  var service_class_data = select_Service_Class_data(service_class_name)
  var divSelectOp = document.getElementById('div_concrete_operation_list');

  if (isEmpty(service_class_data) || isEmpty(service_class_data.list_instances) || service_class_data.list_instances.length <= 0){
      stringHTML = '<select id="select_concrete_op_name" style="-webkit-appearance: button;-webkit-border-radius: 2px;-webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);-webkit-padding-end: 5px;-webkit-padding-start: 2px;-webkit-user-select: none;background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);background-position: 97% center;background-repeat: no-repeat;border: 1px solid #AAA;color: #555;font-size: 12;margin: 20px;overflow: hidden;padding: 5px 10px;text-overflow: ellipsis;white-space: nowrap;width: 300px;"></select>'
      divSelectOp.innerHTML = stringHTML
      return;
  } else {
      stringHTML = '<select id="select_concrete_op_name" style="-webkit-appearance: button;-webkit-border-radius: 2px;-webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);-webkit-padding-end: 5px;-webkit-padding-start: 2px;-webkit-user-select: none;background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);background-position: 97% center;background-repeat: no-repeat;border: 1px solid #AAA;color: #555;font-size: 13px;margin: 5px;overflow: hidden;padding: 5px 15px;text-overflow: ellipsis;white-space: nowrap;width: 400px;">';
      for(var index = 0 ; index < service_class_data.list_instances.length ; index++){
          stringHTML += '<option value="' + service_class_data.list_instances[index].local_name + '">' + service_class_data.list_instances[index].local_name + "</option>"
      }
      stringHTML += '</select>'
      divSelectOp.innerHTML = stringHTML
      return;
  }
     
}

function generate_tree_view_data(resources_data){
  var root = {} 
  if (isEmpty(resources_data.subclasses) || resources_data.subclasses.length <= 0){
    root.text = resources_data.class_ontology_name
    return root
  } else {
    root.text = resources_data.class_ontology_name
    root.nodes = []
    var index = 0
    for(index = 0 ; index < resources_data.subclasses.length ; index++){
        root.nodes.push(generate_tree_view_data(resources_data.subclasses[index]))
    }
    return root
  }
}

/* Initial State Tree View **/

function saveAddInitialState_Modal_TreeView(){
    if(!isEmpty(input_componets) && input_componets.length >= 1){
      document.getElementById('cy').style.visibility = "visible";
      var addInitialStateModal_TreeView = document.getElementById('addInitialStateModal_TreeView');
      addInitialStateModal_TreeView.style.display = "none";
  
      var initial_state_node = {}

      if (!isEmpty(GLOBAL_INITIAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE)
          && !objectIsEmpty(GLOBAL_INITIAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE)
          && (GLOBAL_INITIAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE.components.length > 0)){
         initial_state_node = GLOBAL_INITIAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE
      } else {
         initial_state_node.components = []
      } 
      
      var e =  document.getElementById("selectInitialState_DataFormatClasses_TreeView");
      var selected_data_format = e.options[e.selectedIndex].value
      if (isEmpty(selected_data_format)){
        selected_data_format = "unknown"
      }

      var an_initial_component = {"local_name":input_componets[0],"uri":input_componets[0],"data_format":selected_data_format}
      initial_state_node.components.push(an_initial_component)
      displayInitialState_From_Ontology(initial_state_node)
  } else {
    $.msgBox({
      title:"Warning",
      content:"Please select resources and their data formats to define Initial State!",
      type:"warning"
     }); 
    return
  }
}

function closeAddInitialState_Modal_TreeView(){
   var addInitialStateModal_TreeView = document.getElementById('addInitialStateModal_TreeView');
   addInitialStateModal_TreeView.style.display = "none";
   document.getElementById('cy').style.visibility = "visible";
}

function openAddInitialState_FromOntology_Modal_TreeView(){
    document.getElementById('cy').style.visibility = "hidden";
    var addInitialStateModal_TreeView = document.getElementById('addInitialStateModal_TreeView');
    addInitialStateModal_TreeView.style.display = "block";
}

/* Goal State Tree View **/

function openAddGoalState_FromOntology_Modal_TreeView(){
    document.getElementById('cy').style.visibility = "hidden";
    var addGoalStateModal_TreeView = document.getElementById('addGoalStateModal_TreeView');
    addGoalStateModal_TreeView.style.display = "block";
}

function closeAddGoalState_Modal_TreeView(){
   var addGoalStateModal_TreeView = document.getElementById('addGoalStateModal_TreeView');
   addGoalStateModal_TreeView.style.display = "none";
   document.getElementById('cy').style.visibility = "visible";
}

function saveAddGoalState_Modal_TreeView(){
    if(!isEmpty(output_components) && output_components.length >= 1){
      document.getElementById('cy').style.visibility = "visible";
      var addGoalStateModal_TreeView = document.getElementById('addGoalStateModal_TreeView');
      addGoalStateModal_TreeView.style.display = "none";
  
      var goal_state_node = {}

      if (!isEmpty(GLOBAL_GOAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE)
          && !objectIsEmpty(GLOBAL_GOAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE)
          && (GLOBAL_GOAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE.components.length > 0)){
         goal_state_node = GLOBAL_GOAL_STATE_ONTOLOGY_FOR_PLANNING_PURPOSE
      } else {
         goal_state_node.components = []
      } 
      
      var e =  document.getElementById("selectGoalState_DataFormatClasses_TreeView");
      var selected_data_format = e.options[e.selectedIndex].value
      if (isEmpty(selected_data_format)){
        selected_data_format = "unknown"
      }

      var an_goal_component = {"local_name":output_components[0],"uri":output_components[0],"data_format":selected_data_format}
      goal_state_node.components.push(an_goal_component)
      displayGoalState_From_Ontology(goal_state_node)
  } else {
     $.msgBox({
        title:"Warning",
        content:"Please select resources and their data formats to define Goal State !",
        type:"warning"
     }); 
    return
  }
}

/* Add Concrete Service Tree View */
function saveAddOperationNodeData_Modal(){
   var addOperationNodeData_modal = document.getElementById('addOperationNodeDataModal');
   addOperationNodeData_modal.style.display = "none";
   document.getElementById('cy').style.visibility = "visible";

   var e =  document.getElementById("select_concrete_op_name");
   var selected_op_id = e.options[e.selectedIndex].value
   if (isEmpty(selected_op_id)){
     selected_op_id = "unknown"
   } 

   if (selected_op_id == null) {
       return;
   }

   ADDED_OPERATION_NODES_LIST.push(selected_op_id)
   var data = {
       group: 'nodes',
       id: selected_op_id,
       name: selected_op_id,
       type:SERIVE_NODE_CONFIG.type,
       faveShape:SERIVE_NODE_CONFIG.shape,
       color:SERIVE_NODE_CONFIG.color,
       text_color:SERIVE_NODE_CONFIG.text_color
   };

   var new_node = {}
   new_node.id = selected_op_id
   new_node.name = selected_op_id
   new_node.shape = SERIVE_NODE_CONFIG.shape
   new_node.type = SERIVE_NODE_CONFIG.type
   GLOBAL_NODES_DATA.push(initNode_forGraphic(new_node))
   
   cy.add({
       data: data,
   });

   cy.center()
   cy.fit()
}