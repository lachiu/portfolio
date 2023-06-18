function show_motd_output($args) {
    let now=new Date();
    const timediff=now.getTime()-start_time.getTime();
    const uptime_days=Math.floor(timediff/86400000);
    const uptime_hours=Math.floor(timediff/3600000);
    const uptime_minutes=Math.floor(timediff/60000);
    const uptime_seconds=Math.floor(timediff/1000);
    resolution=`${terminal.offsetWidth}x${terminal.offsetHeight}`;
    uptime=`${uptime_days > 0 ? uptime_days + "d" : ""}${uptime_hours > 0 ? uptime_hours + "h" : ""}${uptime_minutes > 0 ? uptime_minutes + "m" : ""}${uptime_seconds > 0 ? uptime_seconds + "s" : ""}`;
    if (uptime.length==0) { uptime="Booting up"; }
    const logo=`
                                  <span style=color:red;>./o+-</span>         <span style=color:red;>${username}</span>${user_host_seperator}<span style=color:red;>${hostname}</span>
                          yyyyy- <span style=color:red;>-yyyyy+</span>        <span style=color:red;>OS:</span> Ubuntu 22.04 jammy
                       ://+/////<span style=color:red;>-yyyyyyo</span>        <span style=color:red;>Kernel:</span> x86_64 Linux 5.19.0-45-generic
                   <span style=color:brown;>.++</span> .:/+++++/-<span style=color:red;>.+sss/\`</span>        <span style=color:red;>Uptime:</span> ${uptime}
                <span style=color:brown;>.:++o:</span>  /++++++++/:--:/-        <span style=color:red;>Packages:</span> 1750
               <span style=color:brown;>o:+o+:++.</span>\`..\`\`\`.-/ooo            <span style=color:red;>Shell:</span> bash 5.1.16
           <span style=color:brown;>.:+o:+o/.</span>          \`+ssoo+           <span style=color:red;>Resolution:</span> ${resolution}
     <span style=color:orange;>.++/+:</span><span style=color:brown;>+oo+o:\`</span>             /sssooo          <span style=color:red;>DE:</span> GNOME 41.7
    <span style=color:orange;>/+++//+:</span><span style=color:brown;>\`oo+o</span>               /::---:         <span style=color:red;>WM:</span> Mutter
    <span style=color:orange;>\+/+o+++</span><span style=color:brown;>\`o++o</span>               <span style=color:red;>++////:.</span>         <span style=color:red;>WM Theme:</span> Adwaita
     <span style=color:orange;>.++.o+</span><span style=color:brown;>++oo+:\`</span>             <span style=color:red;>/dddhhh.</span>         <span style=color:red;>GTK Theme:</span> Yaru [GTK2/3]
           <span style=color:brown;>.+.o+oo:.</span>          <span style=color:red;>\`oddhhh+</span>          <span style=color:red;>Icon Theme:</span> Yaru
            <span style=color:brown;>\+.++o+o\`</span><span style=color:red;>\`-\`\`\`\`.:ohdhhhhh+</span>           <span style=color:red;>Font:</span> Ubuntu 11
            <span style=color:brown;>\`:o+++</span> <span style=color:red;>\`ohhhhhhyo++os:</span>              <span style=color:red;>Disk:</span> 13G / 98G (14%)
              <span style=color:brown;>.o:</span><span style=color:red;>\`.syhhhhh/</span><span style=color:brown;>.oo++o\`</span>              <span style=color:red;>CPU:</span> Raspberry Pi 4
                  <span style=color:red;>/osyyyyyo</span><span style=color:brown;>++ooo+++/</span>            <span style=color:red;>GPU:</span> RTX 4090 Ti 24GiB
                    <span style=color:red;>\`\`\`\`\`</span> <span style=color:brown;>+oo+++o\:</span>              <span style=color:red;>RAM:</span> 1113MiB / 3911MiB
                           <span style=color:brown;>\`oo++.</span>
    `;
    result=generate_element({elementname: "div", classname: "result"});
    span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: logo, newattr: "style", newvalue: "white-space-collapse: preserve;"});
    result.appendChild(span);
    span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Om gebruik te maken van deze terminal type <span style=color:orange;>mozilla index.html</span>`, newattr: "style", newvalue: "white-space-collapse: preserve;"});
    result.appendChild(span);
    span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `of een van de andere commando's die je kan terugvinden in de <span style=color:orange;>help</span> command.`, newattr: "style", newvalue: "white-space-collapse: preserve;"});
    result.appendChild(span);
    span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: "&nbsp;"});
    result.appendChild(span);
    return result;
}