import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [type, setType] = useState("温泉");

  const [filter, setFilter] = useState("全て");

  const option = ["全て", "温泉", "銭湯"];

  const addItem = () => {
    if (name.trim() === "" && area.trim() === "") {
      return alert("何か入力してください");
    } else if(area.trim() === ""){
      return alert("場所を入力してください");
    } else if(name.trim() === ""){
      return alert("温泉あるいは銭湯名を入力してください");
    }
    const newList = {
      id: Date.now(),
      name: name,
      area: area,
      type: type,
      visited: false,
    };
    setList([...list, newList]);
    setName("");
    setArea("");
  };

  const toggleVisited = (id) => {
    const tgList = list.map((item) =>
      item.id === id ? { ...item, visited: !item.visited } : item,
    );
    setList(tgList);
  };

  const deleteItem = (id) => {
    const dlItem = list.filter((item) => item.id !== id);
    setList(dlItem);
  };
  const selectedList = list.filter(
    (item) => filter === "全て" || item.type === filter,
  );

  return (
    <div className="container">
      <h1 className="title">♨️自分の好きな温泉・銭湯リスト</h1>
      <div className="form">
        <input
          type="text"
          className="input input-name"
          placeholder="温泉・銭湯名 (例:箱根温泉)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />
        <input
          type="text"
          className="input input-area"
          placeholder="場所 (例:神奈川県箱根町)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          onKeyDown={(e) => {if(e.key === "Enter") addItem();}}
        />
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="温泉">温泉</option>
          <option value="銭湯">銭湯</option>{" "}
        </select>

        <button className="add-btn" onClick={addItem}>
          追加
        </button>
      </div>

      <div className="filter">
        {option.map((op) => (
          <button key={op} 
          className={`filter-btn ${
        op === "温泉" ? "filter-onsen" :
        op === "銭湯" ? "filter-sento" :
        "filter-all"
      } ${filter === op ? "active" : ""}`}
          onClick={() => setFilter(op)}>
            {op}
          </button>
        ))}
      </div>

      <ul className="list">
        {selectedList.map((item) => (
          <li key={item.id}>
            {item.name} ({item.area}){" "}
            <span className={item.type === "温泉" ? "onsen" : "sento"}>
              {item.type}
            </span>
            <div>
              <div>{item.visited ? "✅行った" : "🚩行きたい"}</div>
            </div>
            <div className="card-actions">
              <button onClick={() => toggleVisited(item.id)}>切り替え</button>
              <button onClick={() => deleteItem(item.id)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
