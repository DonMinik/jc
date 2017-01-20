<template>
  <div id="app">
    <h2>Java-Community Terminabfrage</h2>
    <p>Hallo zusammen<br/>bitte tragt euren Namen ein und wählt die Termine aus,
      an denen Ihr vorraussichtlich am Jourfix teilnehmen könnt, bzw. an denen
      Ihr keine anderen Regeltermine habt.</p>
    <label for="inputName">Name</label>
    <input id="inputName" v-model="selection.name"/>
    <table >
      <tr><th>Tag</th><th>10:00-11:30</th><th>13:00-14:30</th>
        <th>15:00-16:30</th></tr>
      <tr>
        <td>Mo</td>
        <td><input id="selectMoEarly" type="checkbox" v-model="selection.moEarly"/></td>
        <td><input id="selectMoMid" type="checkbox" v-model="selection.moMid"/></td>
        <td><input id="selectMoLate" type="checkbox" v-model="selection.moLate"/></td>
      </tr>
      <tr>
        <td>Di</td>
        <td><input id="selectDiEarly" type="checkbox" v-model="selection.diEarly"/></td>
        <td><input id="selectDiMid" type="checkbox" v-model="selection.diMid"/></td>
        <td><input id="selectDiLate" type="checkbox" v-model="selection.diLate"/></td>
      </tr>
      <tr>
        <td>Mi</td>
        <td><input id="selectMiEarly" type="checkbox" v-model="selection.miEarly"/></td>
        <td><input id="selectMiMid" type="checkbox" v-model="selection.miMid"/></td>
        <td><input id="selectMiLate" type="checkbox"  v-model="selection.miLate"/></td>
      </tr>
      <tr>
        <td>Do</td>
        <td><input id="selectDoEarly" type="checkbox"  v-model="selection.doEarly"/></td>
        <td><input id="selectDoMid" type="checkbox"  v-model="selection.doMid"/></td>
        <td><input id="selectDoLate" type="checkbox"  v-model="selection.doLate"/></td>
      </tr>
      <tr>
        <td>Fr</td>
        <td><input id="selectFrEarly" type="checkbox"  v-model="selection.frEarly"/></td>
        <td><input id="selectFrMid" type="checkbox" v-model="selection.frMid"/></td>
        <td><input id="selectFrLate" type="checkbox"  v-model="selection.frLate"/></td>
      </tr>
    </table>
    <p>{{selected}}</p>
    <button @click="submit">Auswahl abschicken</button>
    <h2>Ergebnis</h2>
    <table >
      <tr>
        <th>Name</th>
        <th>Mo 10:00</th>
        <th>Mo 13:00</th>
        <th>Mo 15:00</th>
        <th>Di 10:00</th>
        <th>Di 13:00</th>
        <th>Di 15:00</th>
        <th>Mi 10:00</th>
        <th>Mi 13:00</th>
        <th>Mi 15:00</th>
        <th>Do 10:00</th>
        <th>Do 13:00</th>
        <th>Do 15:00</th>
        <th>Fr 10:00</th>
        <th>Fr 13:00</th>
        <th>Fr 15:00</th>
      </tr>

     <template v-for="item in savedData">
        <tr >
          <td>{{item.name}}</td>
          <td>{{item.moEarly}}</td>
          <td>{{item.moMid}}</td>
          <td>{{item.moLate}}</td>
          <td>{{item.diEarly}}</td>
          <td>{{item.diMid}}</td>
          <td>{{item.diLate}}</td>
          <td>{{item.miEarly}}</td>
          <td>{{item.miMid}}</td>
          <td>{{item.miLate}}</td>
          <td>{{item.doEarly}}</td>
          <td>{{item.doMid}}</td>
          <td>{{item.doLate}}</td>
          <td>{{item.frEarly}}</td>
          <td>{{item.frMid}}</td>
          <td>{{item.frLate}}</td>
        </tr>
      </template>
    </table>
    <button @click="loadData">Ergebnis aktualisieren</button>
    </ul>
  </div>

</template>

<script>

export default {
  name: 'app',
  http: {
      emulateJSON: true,
      emulateHTTP: true
    },

  data () {return {
      selection : {
        name : "Max Muster",
        moEarly :false,
        moMid :false,
        moLate: false,
        diEarly :false,
        diMid :false,
        diLate: false,
        miEarly :false,
        miMid :false,
        miLate: false,
        doEarly :false,
        doMid :false,
        doLate: false,
        frEarly :false,
        frMid :false,
        frLate: false
      },
      savedData: [{
    		  "name": "Mike",
    		  "moEarly": true,
    	  	"moMid": true,
    	  	"moLate": true,
    	  	"diEarly": true,
    	  	"diMid": true,
    	  	"diLate": true,
    	  	"miEarly": true,
    	  	"miMid": true,
    	  	"miLate": true,
    	  	"doEarly": true,
    	  	"doMid": true,
    	  	"doLate": true,
    	  	"frEarly": true,
    	  	"frMid": true,
    	  	"frLate": true
    	}]
    }
  },
  methods: {
    submit : function () {
      this.$http.post('http://'+this.$url.parse().hostname+':3000/jc/jf/entry',this.selection).then((response) => {
      }, (response) => {
        //error callback
        console.log(response);
      });
    },
    loadData : function() {
      //load savedData
      this.$http.get('http://'+this.$url.parse().hostname+':3000/jc/jf/entry').then((response) => {
        //success callback
        this.savedData = response.body.data;
      }, (response) => {
        //error callback
        console.log(response);
      })
    }
  }, computed: {
    selected :function() {
      var comp = "Dein Name ist " + this.selection.name + " und kannst an folgenden Terminen";
      if (this.selection.moEarly) comp += " Mo 10:00-11:30" ;
      if (this.selection.moMid) comp += " Mo 13:00-14:30";
      if (this.selection.moLate) comp += " Mo 15:00-16:30";
      if (this.selection.diEarly) comp += " Di 10:00-11:30" ;
      if (this.selection.diMid) comp += " Di 13:00-14:30";
      if (this.selection.diLate) comp += " Di 15:00-16:30";
      if (this.selection.miEarly) comp += " Mi 10:00-11:30" ;
      if (this.selection.miMid) comp += " Mi 13:00-14:30";
      if (this.selection.miLate) comp += " Mi 15:00-16:30";
      if (this.selection.doEarly) comp += " Do 10:00-11:30" ;
      if (this.selection.doMid) comp += " Do 13:00-14:30";
      if (this.selection.doLate) comp += " Do 15:00-16:30";
      if (this.selection.frEarly) comp += " Fr 10:00-11:30" ;
      if (this.selection.frMid) comp += " Fr 13:00-14:30";
      if (this.selection.frLate) comp += " Fr 15:00-16:30";
      return comp;
    }
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
