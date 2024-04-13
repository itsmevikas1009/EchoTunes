import React from "react";
import { Link } from "react-router-dom";

const artists = [
  {
    id: 1,
    name: "Darshan Raval",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-DyNZbOmCsiWtWFNkq0v0Dts9ZJNlMZqhIijCYOPDQ&s",
  },
  {
    id: 2,
    name: "B Praak",
    image:
      "https://scontent.fknu1-1.fna.fbcdn.net/v/t1.6435-1/136106669_241192667372186_849337329253942529_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LQ8D56yH-7gAb6qlpie&_nc_ht=scontent.fknu1-1.fna&oh=00_AfBN1BYi4_TkznOISH4O_xkn93-6KNanjEtb1rNuwMkg_w&oe=663F5EE6",
  },
  {
    id: 3,
    name: "Arijit Singh",
    image:
      "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-6/433285035_1082554323045512_7003536964894794779_n.jpg?stp=c93.0.469.469a_dst-jpg_s851x315&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Dav-yysud_AAb6D7OcT&_nc_ht=scontent.fknu1-6.fna&oh=00_AfDVxoa_czq2EuwnY8SyEPKc7mkgKrUaJpKGNGLRkCdU9g&oe=661DB658",
  },
  {
    id: 4,
    name: "Sonu Nigam",
    image:
      "https://scontent.fknu1-4.fna.fbcdn.net/v/t1.6435-1/159622294_284242306405403_6455343949805869052_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DBAS2pTe5swAb50JQSI&_nc_ht=scontent.fknu1-4.fna&oh=00_AfD2zMIwV31Bn1BGBEnOsSw_sWUjAfOU8uuswuGJJA8vpg&oe=663F3CCF",
  },
  {
    id: 5,
    name: "Shreya Ghoshal",
    image:
      "https://scontent.fknu1-3.fna.fbcdn.net/v/t1.6435-1/141503750_247725706711200_8200738579709778457_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Yysxc2DKZjcAb6332nV&_nc_ht=scontent.fknu1-3.fna&oh=00_AfBTVENQzOaZOm-VVXIJDTl0RdrAqRzQcEhEqbc6EOK3pQ&oe=663F34F5",
  },
];

const Artists = () => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mt-4 mb-4">Artists</h2>

      <div className="flex items-center gap-10 overflow-y-hidden overflow-x-auto h-[14.5rem]">
        {artists.map((i) => (
          <Link
            to={`/artists/${i.name}`}
            key={i.id}
            className="cursor-pointer w-[160px] h-[160px]"
          >
            <img
              src={i.image}
              alt={`Image of ${i.name}`}
              className="rounded-full object-contain"
            />
            <p className="text-lg font-semibold text-center opacity-90 py-2">
              {i.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
