import React, { Component } from 'react';
import { NavBar,NoticeBar} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'; 
import { List, Stepper,InputItem,Button,Toast} from 'antd-mobile';
const round = require('./modules/card/poker');
const rule = require('./modules/card/texas_holdem/taxasholdem_rule');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playernumber: 3,
      caltimes:10,
      players:[{id:0,name:'',hands:[],wintimes:0},{id:1,name:'',hands:[],wintimes:0},{id:2,name:'',hands:[],wintimes:0}],
      pubcards:[],
      pubcardstext:'',
      animating:false,
      buttontext:"开始预测",
      loading:false
    };
  }
  onPlayernumberChange = val=>{
    let origin = this.state.playernumber;
    if(val>origin){
      let p = {id:(val-1),name:'',hands:[],wintimes:0};
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
      playernumber:val
    })
  }

  onCaltimesChange = val =>{
    this.setState({
      caltimes:val
    })
  }
  setPlayername = (index,val)=>{
    let players = this.state.players;
    for(let i =0;i<players.length;i++){
      let p = players[i];
      p.wintimes = 0;
      if(p.id===index){
        p.name = val
      }
    }
    this.setState({
      players:players
    })
  }
  predict = ()=>{
    this.setState({
      buttontext:'计算中......',
      loading:true
    })
    
    let _this = this
    setTimeout(function(){
      _this.dopredict()
      
    },0)
  }

  dopredict = ()=>{
    let players = this.state.players;
    players.map((val,inde,arr)=>{
      val.wintimes = 0;
      return val;
    });
    let caltimes = this.state.caltimes;
    for(let k=0;k<caltimes;k++){
      for(let i =0;i<players.length;i++){
        if(players[i].name===''){
          Toast.info('昵称不全!👻尼玛晓得哪个是哪个?', 1);
          this.setState({
            buttontext:'开始预测',
            loading:false
          })
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
        if(rule.compareTwo(predicted[i].biggestcards,predicted[i+1].biggestcards)===rule.COMPARE_EQUAL){
          predicted[i+1].winner = "winner";
        }else{
          predicted[i+1].winner = "loser"
        }
      }
      predicted.map((val,inde,arr)=>{
        if(val.winner==='winner'){
          val.wintimes++;
        }
        return val;
      })
      this.setState({
        players:predicted,
        pubcards:pubcards,
        pubcardstext:pubcardstext
      })
     }
     this.setState({
      buttontext:'再来一次',
      loading:false
    })
    }

  render() {
    let userlist=[];
    let predictresult=[];
    
    let players = this.state.players;
    for(let i = 0;i<this.state.playernumber;i++){
      userlist.push(<InputItem onChange={(val)=>{this.setPlayername(i,val)}} key={'name'+i}>玩家</InputItem>)
      if(players[i].hands[0] != null){
        predictresult.push(<InputItem extra={players[i].cardstypetext+"-"+players[i].winner+"-胜利次数:"+players[i].wintimes} key={'uname'+i} value={players[i].hands.handsview}>{players[i].name}</InputItem>)
      }
    }
    if(this.state.pubcardstext!==''){
      predictresult.push(<InputItem key='pubcards' value={this.state.pubcardstext}>公共牌</InputItem>)
    }
    return (
      <>
      <div className="App">
        <NavBar
            mode="light"
        >德州运势分析器</NavBar>
      </div>
      <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        Notice: 计算次数上万小心手机性能跟不上
      </NoticeBar>
      <List>
      <List.Item
        wrap
        extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            max={8}
            min={1}
            value={this.state.playernumber}
            onChange={this.onPlayernumberChange}
          />}
      >
      玩家人数
      </List.Item>
      <List.Item
        wrap
        extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            min={1}
            value={this.state.caltimes}
            onChange={this.onCaltimesChange}
          />}
      >
      计算次数
      </List.Item>
      </List>
      <List renderHeader={() => '设置昵称'}>
        {userlist}
      </List>
      <Button type="primary" loading={this.state.loading} onClick={this.predict}>{this.state.buttontext}</Button>
      <List renderHeader={() => {if(this.state.pubcardstext!=='') {return '手牌'}else{}}}>
        {predictresult}
      </List>
      </>
    );
  }
}

export default App;
