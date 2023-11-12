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
  // friends list
  const [friends, setFriends] = useState(initialFriends);
  function friendsHandler(friend) {
    if (!friend.name || !friend.image) return;
    setFriends((friendsList) => [...friendsList, friend]);
    addFriendHandler();
  }
  // add friend form state
  const [isAddFriendOpen, setAddFriendIsOpen] = useState(false);
  function addFriendHandler() {
    setAddFriendIsOpen((isOpen) => !isOpen);
  }
  const [name, setName] = useState("");
  function nameHandler(value) {
    setName(value);
  }
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function imageHandler(value) {
    setImage(value);
  }
  // Form split bill
  const [isSplitBillOpen, setIsSplitBillOpen] = useState(false);
  function splitBillHandler() {
    setIsSplitBillOpen((cur) => !cur);
  }
  const [selectedFriend, setSelectedFriend] = useState({});
  function selectFriendHandler(friend) {
    setSelectedFriend(friend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onOpenSplitBill={splitBillHandler}
          onSelect={selectFriendHandler}
        />
        {isAddFriendOpen && (
          <AddFriendsForm
            name={name}
            image={image}
            onName={nameHandler}
            onImage={imageHandler}
            onFriendsAdd={friendsHandler}
          />
        )}
        <Button onClick={addFriendHandler}>
          {isAddFriendOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {isSplitBillOpen && <FormSplitBill selected={selectedFriend} />}
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

function FriendsList({ friends, onOpenSplitBill, onSelect }) {
  return (
    <ul>
      {/* {console.log(friends)} */}
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onOpenSplitBill={onOpenSplitBill}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onOpenSplitBill, onSelect }) {
  function selectHandler() {
    onOpenSplitBill();
    onSelect(friend);
  }
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
      <Button onClick={selectHandler}>Select</Button>
    </li>
  );
}

function AddFriendsForm({ name, image, onImage, onName, onFriendsAdd }) {
  const id = crypto.randomUUID();
  const newFriend = {
    id: id,
    name: name,
    image: `${image}?=${id}`,
    balance: 0,
  };
  return (
    <form className="form-add-friend">
      <label>👨🏽‍🤝‍👨🏻Friend Name</label>
      <input
        type="text"
        onChange={(e) => onName(e.target.value)}
        value={name}
      />

      <label>🖼Image URL </label>
      <input
        type="text"
        onChange={(e) => onImage(e.target.value)}
        value={image}
      />

      <Button
        onClick={(e) => {
          e.preventDefault();
          onFriendsAdd(newFriend);
          onImage("https://i.pravatar.cc/48");
          onName("");
        }}
      >
        Add
      </Button>
    </form>
  );
}
function FormSplitBill({ selected }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selected.name}</h2>
      <label>💰Bill value</label>
      <input type="text" />
      <label>🧍‍♂️Your expense</label>
      <input type="text" />
      <label>👨🏽‍🤝‍👨🏻his's expense</label>
      <input type="text" disabled />
      <label>🤑Who is paying the bill ?</label>
      <select>
        <option value="you">You</option>
        <option value={selected.name}>{selected.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
