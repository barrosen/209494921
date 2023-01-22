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

