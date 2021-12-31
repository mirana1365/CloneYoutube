const videoCardContainer = document.querySelector('.video-card-container');

let api_key = 'your_api_key';
let video_http = 'https://www.googleapis.com/youtube/v3/videos?';
let channel_http = 'https://www.googleapis.com/youtube/v3/channels?';

fetch(video_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: '50',
        regionCode: 'US'
    }))
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.items.forEach(item => {
            GetChannelIcon(item);
        });
    })
    .catch(err => console.log(err));
const GetChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            id: video_data.snippet.channelId,
        }))
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            // video_data.channel_icon = data.items[0].snippet.thumbnails.default.url;
            // console.log(video_data);
            // console.log(video_data.channel_icon);
            // console.log(video_data.snippet.channelId);
            // console.log(video_data.snippet.channelTitle);
            // console.log(video_data.snippet.title);
            // console.log(video_data.snippet.description);
            // console.log(video_data.snippet.thumbnails.default.url);
            // console.log(video_data.snippet.publishedAt);
            // console.log(video_data.snippet.tags);
            // console.log(video_data.snippet.categoryId);
            // console.log(video_data.snippet.liveBroadcastContent);
            // console.log(video_data.snippet.defaultLanguage);
            // console.log(video_data.snippet.localized);
            // console.log(video_data.snippet.defaultAudioLanguage);
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            // console.log(video_data);
            makeVideoCard(video_data);
        });
};



const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="videos">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <div class="video-content">
                <img src="${data.channelThumbnail}" class="channel-icon" onclick="location.href = 'https://youtube.com/channel?v=${data.channelId}'">
                <div class="video-info">
                    <h4 class="title" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">${data.snippet.title}</h4>
                    <p class="channel-name" onclick="location.href = 'https://youtube.com/channel?v=${data.channelId}'">${data.snippet.channelTitle}</p>
                </div>
            </div>
    </div>


    

    `;
};