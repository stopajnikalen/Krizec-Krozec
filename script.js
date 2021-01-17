stevilkaIgre=1;
krizecZmage=0;
krozecZmage=0;
neodloceno=0;
stevecPotez=0;
naVrstiKrizec=true;

//Funkcija se izvede, ko se stran naloži. Poskrbi, da je uporabniku prikazana začetna stran.
function zacetek(){
  document.getElementById("kartica2").style.display="none";
}

//Funkcija se kliče ob izbiri začetnega igralca, ki v spremeneljivko shrani trenutnega igralca in to izpiše.
function izbran(simbol){
  if(simbol=="krizec"){
    naVrstiKrizec=true;
  }
  else{
    naVrstiKrizec=false;
  }
  document.getElementById("kartica1").style.display="none";
  document.getElementById("kartica2").style.display="block";
  document.getElementById("nadaljuj").style.display="none";
  if(naVrstiKrizec==true) {
    document.getElementById("izpisIgralca").innerHTML = "Na vrsti je križec!";
  }
  else{
    document.getElementById("izpisIgralca").innerHTML = "Na vrsti je krožec!";
  }
}

//Funkcija služi za menjavo igralcev.
function zamenjaj(){
  naVrstiKrizec=!naVrstiKrizec;
}

function preveriVodoravno(tabela){
  for(let i=0; i<=6; i=i+3){
    if((tabela[i]=="krizec") && (tabela[i+1]=="krizec") && (tabela[i+2]=="krizec")){
      return "krizec";
    }
    else if((tabela[i]=="krozec") && (tabela[i+1]=="krozec") && (tabela[i+2]=="krozec")){
      return "krozec";
    }
  }
}

function preveriNavpicno(tabela){
  for(let i=0; i<=2; i=i+1){
    if((tabela[i]=="krizec") && (tabela[i+3]=="krizec") && (tabela[i+6]=="krizec")){
      return "krizec";
    }
    else if((tabela[i]=="krozec") && (tabela[i+3]=="krozec") && (tabela[i+6]=="krozec")){
      return "krozec";
    }
  }
}

function preveriDiagonalno(tabela){
  //Diagonala 1
  if((tabela[0]=="krizec") && (tabela[4]=="krizec") && (tabela[8]=="krizec")){
    return "krizec";
  }
  else if((tabela[0]=="krozec") && (tabela[4]=="krozec") && (tabela[8]=="krozec")){
    return "krozec";
  }
  //Diagonala 2
  else if((tabela[2]=="krizec") && (tabela[4]=="krizec") && (tabela[6]=="krizec")){
    return "krizec";
  }
  else if((tabela[2]=="krozec") && (tabela[4]=="krozec") && (tabela[6]=="krozec")){
    return "krozec";
  }
}

//Funkcija preveri, ali je kateri igralec zmagal. Najprej pretvori celo igralno polje v tabelo, nato pa preveri zmagovalne kombinacije vodoravno, navpično in diagonalno.
function preveriZmagovalca(){
  stevecKrizcev=0;
  stevecKrozcev=0;
  zmagovalec="";
  let tabela=[];
  for(let i=1; i<=9; i++) {
    if (document.getElementById(i).getAttribute('src') == "src/krizec.png") {
      tabela[i - 1] = "krizec";
    }
    if(document.getElementById(i).getAttribute('src') == "src/krozec.png") {
      tabela[i - 1] = "krozec";
    }
  }

  //Vodoravno
  zmagovalec = preveriVodoravno(tabela);

  //Navpicno
  if(zmagovalec==undefined){
    zmagovalec = preveriNavpicno(tabela);
  }

  if(zmagovalec==undefined){
    //Diagonali
    zmagovalec = preveriDiagonalno(tabela);
  }

  //V primeru zmagovalca se ta izpiše
  if(zmagovalec=="krizec" || zmagovalec=="krozec"){
    document.getElementById("izpisIgralca").classList.remove("alert-primary");
    document.getElementById("izpisIgralca").classList.add("alert-danger");
    document.getElementById("izpisIgralca").innerHTML = "Zmagovalec igre je " + zmagovalec + "!";
    document.getElementById("tabelaRezultatov").innerHTML+="<tr><td>"+stevilkaIgre+"</td><td>Zmagal je "+ zmagovalec +".</td></tr>";
    document.getElementById("nadaljuj").style.display="inline";
    for(let i=1; i<=9; i++){
      document.getElementById(i).onclick=function(){
        return false;
      }
    }
    konec(zmagovalec);
  }
  //Če so zapolnjena vsa polja in zmagovalša še vedno ni, je rezultat neodločen
  else if(stevecPotez==9){
    zmagovalec="neodloceno";
    document.getElementById("izpisIgralca").classList.remove("alert-primary");
    document.getElementById("izpisIgralca").classList.add("alert-danger");
    document.getElementById("izpisIgralca").innerHTML = "Neodločeno!";
    document.getElementById("tabelaRezultatov").innerHTML+="<tr><td>"+stevilkaIgre+"</td><td>Nobeden ni zmagal.</td></tr>";
    document.getElementById("nadaljuj").style.display="inline";
    konec(zmagovalec);
  }
  else{
    return false;
  }
}

function konec(zmagovalec){
  if(zmagovalec=="krizec"){
    krizecZmage++;
  }
  else if(zmagovalec=="krozec"){
    krozecZmage++;
  }
  else if(zmagovalec=="neodloceno"){
    neodloceno++;
  }
  vsota=krozecZmage+krizecZmage+neodloceno;
  console.log(vsota);
  if(vsota==5){
	document.getElementById("nadaljuj").style.display="none";
	document.getElementById("izpisIgralca").classList.remove("alert-danger");
	document.getElementById("izpisIgralca").classList.add("alert-warning");  
    if(krizecZmage>krozecZmage){
      document.getElementById("izpisIgralca").innerHTML ="Čestitke! Zmagovalec celotne igre je križec, s " + krizecZmage +" zmagami!";
    }
    else if(krozecZmage>krizecZmage){
      document.getElementById("izpisIgralca").innerHTML ="Čestitke! Zmagovalec celotne igre je krožec, s " + krozecZmage +" zmagami!";
    }
	else{
	  document.getElementById("izpisIgralca").innerHTML ="Ni zmagovalca! Ponovno se pomerite s nasprotnikom!";		
	}	
  }
}

//Funkcija prisotna na poljih. Omogoča postavitev križca ali krožca vanj.
function klik(id){
  stevecPotez++;
  if(naVrstiKrizec==true){
    document.getElementById(id).src="src/krizec.png";
  }
  else{
    document.getElementById(id).src="src/krozec.png";
  }
  document.getElementById(id).onclick=function(){
    return false;
  }
  zamenjaj();
  if(preveriZmagovalca()==false){
    if(naVrstiKrizec==true) {
      document.getElementById("izpisIgralca").innerHTML = "Na vrsti je križec!";
    }
    else{
      document.getElementById("izpisIgralca").innerHTML = "Na vrsti je krožec!";
    }
  }
}

//Funkcija prisotna na gumbu nadaljuj, ki omogoča nadaljevanje igre. Resetira igralno polje.
function nadaljuj(){
  stevecPotez=0;
  stevilkaIgre++;
  for(let i=1; i<=9; i++){
    document.getElementById(i).onclick=function(){
      klik(this.id);
    }
    document.getElementById(i).src="src/nic.png";
  }
  document.getElementById("izpisIgralca").classList.remove("alert-danger");
  document.getElementById("izpisIgralca").classList.add("alert-primary");
  document.getElementById("nadaljuj").style.display="none";
  if(naVrstiKrizec==true) {
    document.getElementById("izpisIgralca").innerHTML = "Na vrsti je križec!";
  }
  else{
    document.getElementById("izpisIgralca").innerHTML = "Na vrsti je krožec!";
  }
}