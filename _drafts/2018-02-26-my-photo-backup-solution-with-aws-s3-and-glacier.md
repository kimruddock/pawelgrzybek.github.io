---
title: My photo backup solution with AWS S3 and Glacier
excerpt: Description…
photo: 2018-02-26.jpg
---

Far far away, someone, somewhere said:

> "There are two kinds of people, those who back up their data and those who have never lost all their data."

Lucky me, I have never been a victim of a situation where I lost all my data just because I do backups regularly. I never do a full backups of my machine though. I can download operating system in few minutes, restore my system preferences via [single click](https://github.com/pawelgrzybek/dotfiles), install all my frequently used apps via [single command](https://caskroom.github.io/), pull all my projects from [Github](https://github.com/) and listen to the music on my [Technics SL-1200](https://en.wikipedia.org/wiki/Technics_SL-1200) or stream it from Apple Music. The only thing that I keep backed up is my photos collection.

!!! IMAGE HERE !!!

## My backup strategy in a nutshell

Since the May 2007 I keep all my photos in well organized collection, ordered chronologically by year and sessions / events. I keep the same habit for all my pictures taken on my iPhone in parallel. It is not an enormous amount of data (around 200GB) but the sentimental value that it stores is immense.

No matter what, I always store this collection on two physical devices. It can be my computers hard drive, external flash disc, NAS server or a RAID array. Currently I use two totally average external [hard drives by Segate](https://www.amazon.co.uk/Seagate-Portable-External-Creative-Photography/dp/B00FP50LH2). Since very recently I am a happy owner of superb [Sony α7R III](https://www.sony.co.uk/electronics/interchangeable-lens-cameras/ilce-7rm3) that shots 80 megabytes ARW files. Taking that into consideration I realize that I may run out of storage on these hard drives very quickly, but for now it does the job.

Things happen! Disks fail, people rob, dogs destroy, rivers flood, comets fall. In case of that we need one more copy in the cloud. I tested multiple solutions and services over the past years and finally I feel that I found something that is going to stick around. Although making a backup to local hard drives is fairly easy and straight forward, cloud backups are way more complicated and I am willing to help you with that.

## What I consider as a good cloud backup and things that I don't care about

There are plenty of services that offer a cloud backups for amateur and professional photographers. [Dropbox](http://dropbox.com), [Google Drive](https://drive.google.com/start), [Box](https://www.box.com/), [OneDrive](https://onedrive.live.com/), [Zoolz](https://home.zoolz.co.uk/) or [Backblaze](https://www.backblaze.com/) just to name a few.

There are few key things that I need to get out of my cloud backup solution. Security first — I really don't want anyone to look at the pictures of my hot girlfriend. There is a solid chance that my collection will grow up over time so auto-scaling and unlimited storage resources is another must-have. New services show up and vanish oftentimes and I am really not interested in investing my time to solutions that aren't well established and have a proven position on the market. Do your remember [copy](https://copy.com/)? Quite cool service — didn't stay for long though. Price is an obvious factor of course.

Providers listed above usually offer tons of things that I simply don't care about. I don't need a fancy app with tons of bells and whistles. I don't need constant live sync and seamless integration with my OS. It is a last resort backup — the files structure is never gonna change. I wil just add more stuff on top of the pile over time.

I am here today not to compare available options or convince you to use one over the another. I spent years looking for a solution that suits my needs and I would like to share it with you.

## AWS Simple Storage Service (S3) & Glacier

[AWS (Amazon Web Services)](https://aws.amazon.com/) is a platform that offers number of things that your business or you, as an individual, may need. From compute power, through database storage, content delivery network to machine learning and IoT (internet of things) related products. Number of storage solutions is one of the many services that AWS has to offer. It is well established and proven by [list of clients](https://aws.amazon.com/solutions/case-studies/all/) that use it: Adobe, AirBnb, Netflix, NASA, SoundCloud, Canon, GoPro and the list goes on and on.

You may have heard an opinion that AWS is complicated to use. In reality it is crazy complicated but to run a band you don't have to play all the instruments — just master a single one. Storage is what we need.

### What it is and how it works

- You can configure S3 to transparently move content to Glacier using lifecycle policies
- The great news is that now that Glacier has been integrated with S3, you can have the best of both worlds:

- you have a full control under your files
- private public
- rules between storage classes
- actually there is one more class in between but this smething that i inteentionally skip in my workflow but it may be very useful in your workflow so it is worth o mention
- for curious roundup about detaild explanation of the whole range of all aws storage solutions: https://youtu.be/bfDpK45Faa0


### How to set it up

- Create an AWS account. Credit card and automatic phone call authozrization is a crucial step
- in my experience that call athorization failed twice during registration procedure buti gave it another try and eveything workedjust fine
- im not the only person who had an issue with a registration step: https://youtu.be/ubCNZRNjhyo
- i would suggest going 

