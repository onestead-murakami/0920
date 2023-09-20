<template>
  <div id="sample1" class="container">
    <h1>{{ msg }}</h1>
    <div class="row">
      <form name="myform" id="myform" class="w-75 mb-5 d-flex ms-auto me-auto" onsubmit="return false;">
        <div class="col text-start">
          <label for="message">メッセージ</label>
          <input type="text" id="message" name="message" class="form-control" placeholder="edit me">
        </div>
        <div class="col text-start">
          <label for="submit" class="w-100">&nbsp;</label>
          <button @click='submit_click' type="button" class="form-control ms-5 w-50 btn btn-primary">送信</button>
        </div>
      </form>
      <table id="contents" class="table w-75 ms-auto me-auto"></table>
    </div>
  </div>
  <div></div>
</template>

<script>
export default {
  name: 'Sample1',
  props: {
    msg: { type:String, default:'Sample1', required:true }
  },
  methods: {
    submit_click: () => {
      const data = Object.fromEntries(new FormData(document.forms.myform));
      fetch('', {
        method: "",
        headers: { 'content-type':'application/json; charset=utf-8' },
        body: JSON.stringify(data)
      })
      .then(response => { return response.json(); })
      .then(json => {
        const contents = document.querySelector('#contents');
        contents.innerHTML = '<tr class="table-primary"><th>メッセージ</th></tr>';
        json.contents.forEach(line => {
          contents.innerHTML += ('<tr><td>' + line + '</td></tr>');
        });
      })
      .catch(error => { console.log(error); })
      .finally(() => { document.querySelector('#message').value = ''; });
    }
  }
}
</script>

<script setup>
      fetch('http://localhost:3000/api/read')
      .then(response => { return response.json(); })
      .then(json => {
        const contents = document.querySelector('#contents');
        contents.innerHTML = '<tr class="table-primary"><th>メッセージ</th></tr>';
        json.contents.forEach(line => {
          contents.innerHTML += ('<tr><td>' + line + '</td></tr>');
        });
      })
      .catch(error => { console.log(error); });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
