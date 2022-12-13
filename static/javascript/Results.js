
let AllItems= [{name:'Jordan Retro 11',type:'High',brand:'Jordans',year:'1996',value:'225',info:'Basketball',link:'https://www.footlocker.com/product/jordan-retro-11-mens/C8012116.html'},
    {name:'Nike Air Max 95 Essential',type:'Low',brand:'Nike',year:'1995',value:'175',info:'Sports and Casual',link:'https://www.footlocker.com/product/nike-air-max-95-essential-mens/M0011002.html'},
    {name:'Adipower Weightlifting 3',type:'Low',brand:'Adidas',year:'2020',value:'165',info:'Weightlifting and Workout',link:'https://www.adidas.com/us/adipower-weightlifting-3-shoes/GY8926.html'},
    {name:'Made in UK 920',type:'Low',brand:'New Balance',year:'2021',value:'250',info:'Casual Sneakers',link:'https://www.newbalance.com/pd/made-in-uk-920/ML920V1-37395.html'}]

let btnGet= document.querySelector('#viewTable');
let myTable = document.querySelector('#table');

let headers = ['Name','Type','Brand','Year','Value','Info','Links'];

btnGet.addEventListener('click', () =>{
    btnGet.style.display = 'none';
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
// For Headers
    headers.forEach(headerText =>{
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
// For items
    AllItems.forEach(item => {
        let row = document.createElement('tr');
        Object.values(item).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            console.log(textNode);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
    })
    myTable.appendChild(table);
    // for (let i=1; i<table.rows; i++){
    //     for(let j=1 j<table.columns)
    var tables=document.getElementsByTagName("TABLE");
    for (x=0;x<tables.length;x++)
    {
        var rows=tables[x].getElementsByTagName('TR');
        for (i=0; i<rows.length; i++)
        {
            var cells=rows[i].getElementsByTagName('td');
            for (z=0;z<cells.length;z++)
            {
                var hyp;var c;
                c=cells[z].innerHTML;
                if (c.indexOf("http") >= 0)
                {
                    hyp='<a href="' + cells[z].innerHTML  + '">' + cells[z].innerHTML + '</a>';
                    c=hyp;
                    cells[z].innerHTML = c;
                }
            }
        }
    }
});

