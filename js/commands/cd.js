function show_cd_output(input) {
    function show_error(folder) {
        result=generate_element({elementname: "div", classname: "result"});
        tmp=generate_element({elementname: "span", classname: "terminal_line", innerHTML: `Directory <span style=color:orange;>${folder}</span> not found`});
        result.appendChild(tmp);
        return result;
    }

    new_directory=typeof input[2] !== "undefined" ? input[2] : (typeof input[1] !== "undefined" ? input[1] : "undefined");
    console.log(`First check: ${typeof input[2] !== "undefined"}`);
    console.log(`Second check: ${typeof input[1] !== "undefined"}`);
    /*
    cd -> home folder
    cd . -> current folder
    cd .. -> parent folder
    cd folder -> folder
    cd folder/sub -> sub folder
    cd folder/sub/ -> sub folder
    */
    if (current_directory=="~") { current_directory="/home/bezoeker/"; }
    old_directory=current_directory;
    console.log(`New directory: ${new_directory}, type ${typeof new_directory}`);
    console.log(`First input: ${input[1]}, type ${typeof input[1]}`);
    console.log(`Second input: ${input[2]}, type ${typeof input[2]}`);
    if (typeof new_directory == "undefined") {
        // home folder
        current_directory="~";
    } else {
        if (new_directory == "..") {
            //parent directory
            current_directory=files[current_directory].parent_folder;            
        } else {
            if (new_directory in files) {
                valid=false;
                selected_files=files[current_directory].files;
                for (let index = 0; index < selected_files.length; index++) {
                    const item = selected_files[index];
                    console.log(item.name);
                    console.log(current_directory);
                    if (item.folder==true && new_directory==item.name) { current_directory+=item.name; valid=true; break; }
                    console.log(current_directory);
                }
                if (!valid) { show_error(new_directory); }
            } else {
                show_error(new_directory);
            }
        }
    }
    console.log(current_directory);
    if (old_directory!==current_directory) { document.getElementById("active_terminal_prompt_path").textContent=current_directory; }
    return null;
}