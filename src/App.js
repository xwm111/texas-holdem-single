import React, { Component } from 'react';
import { NavBar} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'; 
import { List, Stepper,InputItem,Button,Toast} from 'antd-mobile';
const round = require('./modules/card/poker');
const rule = require('./modules/card/texas_holdem/taxasholdem_rule');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 3,
      players:[{id:0,name:'',hands:[]},{id:1,name:'',hands:[]},{id:2,name:'',hands:[]}],
      pubcards:[],
      pubcardstext:''
    };
  }
  onChange = (val)=>{
    let origin = this.state.val;
    if(val>origin){
      let p = {id:(val-1),name:'',hands:[]};
      let players = this.state.players;
      players.push(p);
      this.setState({
        players:players
      })
    }else{
      let players = this.state.players.slice(0,-1);
      this.setState({
        players:players
      })
    }
    this.setState({
      val:val
    })
  }
  setPlayername = (index,val)=>{
    let players = this.state.players;
    for(let i =0;i<players.length;i++){
      let p = players[i];
      if(p.id===index){
        p.name = val
      }
    }
    this.setState({
      players:players
    })
  }
  predict = ()=>{
    let players = this.state.players;
    for(let i =0;i<players.length;i++){
      if(players[i].name===''){
        Toast.info('昵称不全!👻尼玛晓得哪个是哪个?', 1);
        return;
      }
    }
    let result = round.shuffle();
    
    let predicted = players.map((val,inde,arr)=>{
        val.hands = [];
        val.hands.push(result.shift());
        return val;
    });
    predicted = predicted.map((val,inde,arr)=>{
      val.hands.push(result.shift());
      return val;
    })
    // predicted[0].hands=[{number:4,color:3,view:'4♥'},{number:14,color:4,view:'A♠'}];
    // predicted[1].hands=[{number:14,color:1,view:'A♦'},{number:9,color:3,view:'9♥'}];
    // predicted[2].hands=[{number:11,color:1,view:'J♦'},{number:13,color:3,view:'K♥'}];

    let pubcards = result.slice(0,5);

    // pubcards=[{number:10,color:2,view:'10♣'},{number:14,color:2,view:'A♣'},{number:11,color:4,view:'J♠'},{number:10,color:3,view:'10♥'},{number:3,color:4,view:'3♠'}];

    let pubcardstext = '';
    for(let i = 0;i<pubcards.length;i++){
      pubcardstext+=pubcards[i].view
    }

    predicted.map((val,inde,arr)=>{
      val.hands.handsview = val.hands[0].view+val.hands[1].view;
      let servencards = val.hands.concat(pubcards);
      let playercards = rule.findBiggestHandFromSevenCards(servencards);
      let cardstype = rule.calType(playercards);
      val.cardstypetext = rule.getTypeByNumber(cardstype);
      val.biggestcards = playercards;
      return val;
    })


    let compare = (first, second) => {
      if (rule.compareTwo(first.biggestcards, second.biggestcards) === rule.COMPARE_WIN) {
          return -1;
      } else if (rule.compareTwo(first.biggestcards, second.biggestcards) === rule.COMPARE_LOSE) {
          return 1;
      } else {
          return 0;
      }
    }

    predicted.sort(compare);
    predicted[0].winner = "winner";
    for(let i=0;i<predicted.length-1;i++){
      console.log(rule.compareTwo(predicted[i].biggestcards,predicted[i+1].biggestcards));
      if(rule.compareTwo(predicted[i].biggestcards,predicted[i+1].biggestcards)===rule.COMPARE_EQUAL){
        predicted[i+1].winner = "winner";
      }else{
        predicted[i+1].winner = "loser"
      }
    }

    this.setState({
      players:predicted,
      pubcards:pubcards,
      pubcardstext:pubcardstext
    })
  }
  render() {
    let userlist=[];
    let predictresult=[];
    if(this.state.pubcardstext!==''){
      predictresult.push(<InputItem key='pubcards' value={this.state.pubcardstext}>公共牌</InputItem>)
    }
    let players = this.state.players;
    for(let i = 0;i<this.state.val;i++){
      userlist.push(<InputItem onChange={(val)=>{this.setPlayername(i,val)}} key={'name'+i}>玩家</InputItem>)
      if(players[i].hands[0] != null){
        predictresult.push(<InputItem extra={players[i].cardstypetext+"-"+players[i].winner} key={'uname'+i} value={players[i].hands.handsview}>{players[i].name}</InputItem>)
      }
    }
    
    return (
      <>
      <div className="App">
        <NavBar
            mode="light"
        >德州运势分析器</NavBar>
      </div>
      <List>
      <List.Item
        wrap
        extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            max={8}
            min={1}
            value={this.state.val}
            onChange={this.onChange}
          />}
      >
      玩家人数
      </List.Item>
      </List>
      <List renderHeader={() => '设置昵称'}>
        {userlist}
      </List>
      <Button type="primary" onClick={this.predict}>开始预测</Button>
      <List renderHeader={() => {if(this.state.pubcardstext!=='') {return '手牌'}else{}}}>
        {predictresult}
      </List>
      </>
    );
  }
}

export default App;
