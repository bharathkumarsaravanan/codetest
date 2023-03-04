import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PopUp(props){

    const [segment, setSegment] = useState({segment_name:""});
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [selectOptions, setSelectOptions] = useState([{First_name :"first_name"}, 
                                                        {Last_name :"last_name"},
                                                        {Gender :"gender"},
                                                        {Age :"age"},
                                                        {Account_Name :"account_name"},
                                                        {City :"city"},
                                                        {State :"state"},
                                                        ]);
    const [tempSchema, setTempSchema] = useState({});

    function segmentValue(segData){
        var {value} = segData.target;
        setSegment({segment_name: value});
    }

    function schemaValues(schemaData){
        var {value} = schemaData.target;
        var nameOfTheSchema = schemaData.target.selectedOptions[0].text;
        setTempSchema({[nameOfTheSchema]:value});
    }

    function addSchema(atr){
        atr.preventDefault();
        var selectValue = document.getElementById("segmentSelecter").value;
        if (selectValue == "defOption"){
            alert("invalid input")
        } else {
            document.getElementById("segmentSelecter").value = "defOption";
            setSelectedSchemas(prev => {
                return[
                    ...prev,
                    tempSchema
                ]
            });
        }

    }

    function updateSchema(schemaData){
        var {value, name} = schemaData.target;
        var nameOfTheSchema = schemaData.target.selectedOptions[0].text;
        var updatedSchema = {[nameOfTheSchema]:value};
        setSelectedSchemas(prev => {
            return prev.map((scheme, schemeIndex) => {
                if (schemeIndex == name) {
                    return updatedSchema
                } else {
                    return scheme
                }
            })
        })
    }


    function handleSubmit(){
        if (segment.segment_name !== "" && selectedSchemas.length !== 0) {
            console.log({segment_name: segment.segment_name, schema: selectedSchemas});
            axios.post("https://webhook.site/710dfeec-5133-46f7-a4b8-7a673e7830d9", {segment_name: segment.segment_name, schema: selectedSchemas})
            .then(response => {
                console.log({result: "sent"});
                setSelectOptions([{First_name :"first_name"}, {Last_name :"last_name"},{Gender :"gender"},{Age :"age"},
                                {Account_Name :"account_name"},{City :"city"},{State :"state"}]);
                setSegment({segment_name:""});
                setSelectedSchemas([]);
                setTempSchema({});
    
            });
        } else {
            alert("invalid input");
        }

    }

    if (!props.visible) return null

    return ReactDom.createPortal(
        <div className="portal">
            <div className="popUp">
                <div className="popHeader">
                    <h1>Saving Segments</h1>
                </div>
                <div>
                    <h4>Segment name</h4>
                    <input 
                        type="text"
                        placeholder="Enter the segment name"
                        onChange={segmentValue}
                        value={segment.segment_name}
                         />
                </div>
                <div>
                    <h4>To save the segments, you need to add schemas and provide a segment name</h4>
                    <div className="schemas" style={{border: selectedSchemas.length!==0&& "2px solid #219ff3"}}>
                        {selectedSchemas.map((newSelect,selectIndex) => {
                            return (
                                <select 
                                    defaultValue={Object.values(newSelect)[0]} 
                                    name={selectIndex}
                                    onChange={updateSchema}
                                    >
                                    <option value={Object.values(newSelect)[0]}>{Object.keys(newSelect)[0]}</option>
                                    {selectOptions.map(ops => {
                                        if (selectedSchemas.filter(data => Object.values(ops)[0] == Object.values(data)[0]).length == 0){
                                            return <option value={Object.values(ops)[0]}>{Object.keys(ops)[0]}</option>
                                        }
                                    })}

                                </select>
                            )
                        })}
                    </div>

                    <select onChange={schemaValues} id="segmentSelecter">
                        <option  disabled selected value="defOption">Add Schema to Segment</option>
                        {selectOptions.map(ops => {
                            if (selectedSchemas.filter(data => Object.values(ops)[0] == Object.values(data)[0]).length == 0){
                                return <option value={Object.values(ops)[0]}>{Object.keys(ops)[0]}</option>
                            }
                        } )}
                    </select>
                    <Link onClick={addSchema}>+ Add schema</Link>
                </div>
                <div className="buttons">
                    <button onClick={handleSubmit}>Save the segment</button>
                    <button onClick={() =>  props.setVisible(false)}>Close</button>
                </div>

            </div>
        </div>, document.getElementById('portal')
    )
}

export default PopUp;