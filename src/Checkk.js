import React, { useState,useEffect } from "react";

function Checkk() {
  const [inputList, setInputList] = useState(
      [{ firstName: "", lastName: "" }]
      );
useEffect(()=>{
    console.log(inputList);
    console.log(inputList.length - 1);
},[inputList])
  // handle input change
  const handleInputChange = (e, index) => {
      console.log(index);

    // const { name, innerText } = e.target;
    // console.log(name,index,innerText);
    const list = [...inputList];
    list[index][e.target.getAttribute('name')] = e.target.innerText;
    setInputList(list);
  };
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };
  // handle click event of the Remove button
  const handleRemoveClick = index => {
      console.log(index);
    const list = [...inputList];
    console.log(list[index]);
    list.splice(index, 1);
    console.log(list);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  return (
    <div className="App">
      <h3>Check</h3>
      {inputList.map((x, i) => {
        return (
          <div key={i} className="box">
            {/* <input
              name="firstName"
			  placeholder="Enter First Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
            /> */}
            <p
            name="firstName"
            placeholder="Enter First Name"
            contentEditable='true'
            // value={x.firstName}
          
            style={{border:'1px solid black'}}
            onInput={e => handleInputChange(e, i)}
            suppressContentEditableWarning={true}
            >{x.firstName}</p>
            {/* <input
              className="ml10"
              name="lastName"
			  placeholder="Enter Last Name"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
            /> */}
            <p className="ml10"
              name="lastName"
			  placeholder="Enter Last Name"
              contentEditable='true'
              style={{border:'1px solid black'}}
              
            //   value={x.lastName}
              onInput={e => handleInputChange(e, i)}
              suppressContentEditableWarning={true}
            >{x.lastName}</p>
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
   
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit reprehenderit iusto ducimus aliquid eaque optio voluptatem sint architecto saepe earum atque ad cum autem, labore mollitia ipsum. Architecto modi vero quaerat ratione, sapiente fugit error sint labore ducimus iusto explicabo reprehenderit molestiae, consequuntur recusandae dolores esse aperiam ipsa corporis nihil corrupti. Officiis accusamus aliquam exercitationem repellendus dolore est magni voluptas reiciendis, minus vel quidem assumenda ex quam omnis vitae adipisci veritatis minima, at, harum autem ut quisquam! Maiores dolore tenetur dignissimos animi explicabo doloremque facere dolor doloribus repellendus! Esse quidem eaque, autem temporibus quaerat optio natus saepe? Totam, reprehenderit sapiente.
    </div>
  );
}

export default Checkk;

