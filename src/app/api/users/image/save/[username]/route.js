import fs from 'fs';

export async function GET(request, { params }) {

    try {
        console.log("/api/users/image/save/[username] GET");
        // console.log(request);
        // console.log(params);
        const username = params.username;
        const options = {
            method: 'GET',
            redirect: 'follow'
        };
        // console.log(username);
        const fetchResult = await fetch(`https://api.multiavatar.com/${username}.svg?apikey=L9RgybYqzUmlXs`, options)

        if (fetchResult.ok) {
            const fetchResultText = await fetchResult.text();
            console.log(fetchResultText);
            // const blob = new Blob([fetchResultText],{type: 'svg'})
            // const buffer = Buffer.from(await blob.arrayBuffer());
            // const targetPath = `./public/profile_pic/${username}.svg`
            const targetPath = `./public/profile_pic/${username}.svg`

            fs.writeFile(targetPath, fetchResultText, err => {

            })
            console.log(targetPath);

        } else {
            throw new Error(fetchResult)
        }
    } catch (err) {
        console.log("/api/users/image/save/username ERROR GET");
        console.error(err);
    }

}