import { log } from 'console';
import fs from 'fs';

export async function PATCH(request, { params }) {

    const checkSvg = (text) => {
        return text.includes('<svg')
    }

    try {
        console.log("/api/users/image/reload/[username] PATCH");


        const ninjas_api_key = process.env.NINJAS_API_KEY;
        const ninjas_url = 'https://api.api-ninjas.com/v1/randomword'

        const optionsWordAPI = {
            method: 'GET',
            headers: {
                'X-Api-Key': `${ninjas_api_key}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        }
        const fetchTextWordAPI = await (await fetch(ninjas_url, optionsWordAPI)).json();

        const word = fetchTextWordAPI.word;
        console.log(word);
        const username = params.username;
        ///////////////////////////////////////////////////////////////////////////
        const optionsMultiAvatar = {
            method: 'GET',
            next: {
                revalidate: 0
            },
            // redirect: 'follow', //this was throwing an error.dunno why

        }

        const multiavatar_api_key = process.env.MULTIAVATAR_API_KEY;
        const multiavatar_url = `https://api.multiavatar.com/${word}.svg?apikey=${multiavatar_api_key}`
        const fetchResultMultiAvatar = await fetch(multiavatar_url, optionsMultiAvatar)

        console.log(fetchResultMultiAvatar.status);
        const fetchResultMultiAvatarText = await fetchResultMultiAvatar.text();
        if (fetchResultMultiAvatar.ok || checkSvg(fetchResultMultiAvatarText)) { //revisar esto: por alguna razon devuelve
            //error 500 pero el svg está correcto. Debe formar parte de alguna modificación que hace Nextjs

            // const targetPath = `./public/profile_pic/${username}.svg`
            const targetPath = `./public/profile_pic/${username}.svg`

            fs.writeFile(targetPath, fetchResultMultiAvatarText, err => { })
            console.log(targetPath);
        } else {
            console.log('error fetching multiavatar');
            throw new Error(fetchResultMultiAvatarText);
        }
    } catch (err) {
        console.log("/api/users/image/reload/username ERROR PATCH");
        console.error(err);
    }


}