import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  // add friend form state
  const [isAddFriendOpen, setAddFriendIsOpen] = useState(false);
  function addFriendHandler() {
    setAddFriendIsOpen((isOpen) => !isOpen);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {isAddFriendOpen && <AddFriendsForm />}
        <Button onClick={addFriendHandler}>
          {isAddFriendOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="green">
          you owe {friend.name} {-friend.balance}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="red">
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function AddFriendsForm() {
  const [name, setName] = useState("");
  function nameHandler(value) {
    setName(value);
  }
  const [image, setImage] = useState("");
  function imageHandler(value) {
    setImage(value);
  }
  return (
    <form className="form-add-friend">
      <label>👨🏽‍🤝‍👨🏻Friend Name</label>
      <input
        type="text"
        onChange={(e) => nameHandler(e.target.value)}
        value={name}
      />

      <label>🖼Image URL </label>
      <input
        type="text"
        onChange={(e) => imageHandler(e.target.value)}
        value={image}
      />

      <Button>Add</Button>
    </form>
  );
}
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with</h2>
      <label>💰Bill value</label>
      <input type="text" />
      <label>🧍‍♂️Your expense</label>
      <input type="text" />
      <label>👨🏽‍🤝‍👨🏻his's expense</label>
      <input type="text" disabled />
      <label>🤑Who is paying the bill ?</label>
      <select>
        <option value="you">You</option>
        <option value="him">Him</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
