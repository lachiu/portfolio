function show_motd_output($args) {
    let now=new Date();
    const timediff=now.getTime()-start_time.getTime();
    uptime=`${Math.floor(timediff/86400000)}d${Math.floor(timediff/3600000)}h${Math.floor(timediff/60000)}m${Math.floor(timediff/1000)}s`;
    const logo=`                                  ./+o+-        ${username}${user_host_seperator}${hostname}
                          yyyyy- -yyyyyy+       OS: Ubuntu 22.04 jammy
                       ://+//////-yyyyyyo       Kernel: x86_64 Linux 5.19.0-45-generic
                   .++ .:/++++++/-.+sss/\`       Uptime: ${uptime}
                .:++o:  /++++++++/:--:/-        Packages: 1750
               o:+o+:++.\`..\`\`\`.-/oo/            Shell: bash 5.1.16
           .:+o:+o/.          \`+sssoo+/         Resolution: ${resolution}
     .++/+:+oo+o:\`             /sssooo.         DE: GNOME 41.7
    /+++//+:\`oo+o               /::--:.         WM: Mutter
    \+/+o+++\`o++o               ++////.          WM Theme: Adwaita
     .++.o+++oo+:\`             /dddhhh.         GTK Theme: Yaru [GTK2/3]
           .+.o+oo:.          \`oddhhhh+         Icon Theme: Yaru
            \+.++o+o\`\`-\`\`\`\`.:ohdhhhhh+           Font: Ubuntu 11
            \`:o+++ \`ohhhhhhyo++os:              Disk: 13G / 98G (14%)
              .o:\`.syhhhhh/.oo++o\`              CPU: Raspberry Pi 4
                  /osyyyyyo++ooo+++/            GPU: RTX 4090 Ti 24GiB
                    \`\`\`\`\` +oo+++o\:              RAM: 1113MiB / 3911MiB
                           \`oo++.`;
    result=generate_element({elementname: "div", classname: "result"});
    span=generate_element({elementname: "span", classname: "terminal_line", innerHTML: logo, newattr: "style", newvalue: "white-space-collapse: preserve;"});
    result.appendChild(span);
    return result;
}