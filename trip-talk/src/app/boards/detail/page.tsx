import React from 'react';

import Image from 'next/image';
import LinkIcon from '../../../../public/icons/link_icon.svg';
import LocationIcon from '@/../public/icons/location_icon.svg';
import LikeIcon from '@/../public/icons/like_icon.svg';
import UnLikeIcon from '@/../public/icons/unlike_icon.svg';
import ListIcon from '@/../public/icons/list_icon.svg';
import EditIcon from '@/../public/icons/edit_icon.svg';
import MockImg1 from '@/../public/images/mockImg1.png';
import MockImg2 from '@/../public/images/mockImg2.svg';
import Button from '@/app/_component/form/Button';
import s from './PostDetail.module.css';
// import Button from '_component/form/Button';
const PostDetail = () => {
  return (
    <>
      <div>
        <div className="border-b-[#E4E4E4] border-b border-solid">
          <h3 className={s.H3}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </h3>
          <div className={`${s.flexbox} gap-1`}>
            <div className={`${s.flexbox} gap-1`}>
              <p className={s.userImg} />
              <p className={s.userName}>윤준수</p>
            </div>
            <span className={s.dateFormat}>2024.09.23</span>
          </div>
        </div>
        <section className="w-full">
          <div className={`${s.flexbox} justify-end gap-1`}>
            <button>
              <Image src={LinkIcon} alt="linkIcon" width={0} height={0} />
            </button>
            <button>
              <Image src={LocationIcon} alt="" width={0} height={0} />
            </button>
          </div>
          <Image src={MockImg1} alt="" width={0} height={0} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quia
            cupiditate labore quos voluptate, sit illo assumenda. Corporis
            doloremque consectetur ipsam commodi vitae debitis accusantium, illo
            dignissimos dolores quibusdam quas autem ab vel repudiandae
            veritatis mollitia. Culpa unde repudiandae rem maxime perspiciatis
            omnis quis voluptatibus eligendi. Iusto natus optio, velit dolorum
            consectetur voluptates placeat tempora, iure, quam pariatur esse
            fugiat magni quas necessitatibus sunt veniam? Quod ullam ea
            accusantium ipsa voluptas esse, harum repellat labore. Commodi dicta
            fuga et aliquid! Magni alias debitis consequatur voluptatum quae.
            Accusamus culpa illum dicta, atque beatae ducimus eum, at facere
            alias, sunt repudiandae repellendus. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Officia dolore, fugit dicta minima,
            omnis corrupti expedita vel quisquam, consectetur magnam eum sed
            nostrum numquam sequi tenetur repellat! Repudiandae asperiores
            tempore labore necessitatibus, totam est laborum excepturi quae, ex
            nam placeat dolorum vero eveniet aliquid dignissimos ea earum
            voluptate sapiente, assumenda itaque delectus? Alias repudiandae
            error delectus quasi quos consequuntur distinctio repellendus quo
            doloribus neque dolorem eveniet doloremque, debitis, ipsam magni
            quibusdam? Quam dignissimos deleniti adipisci, facilis error illo
            assumenda. Ipsa nobis consequatur tenetur nostrum nemo harum
            praesentium id dolor illo sequi, deleniti quis quo doloribus placeat
            obcaecati. Mollitia, dolorem repudiandae.
          </p>
          <div className={`${s.videoBox}`}>
            <Image src={MockImg2} alt="" width={0} height={0} />
          </div>
          <div className={`${s.flexbox} justify-center gap-6`}>
            <button>
              <Image src={UnLikeIcon} alt="" width={0} height={0} />
              <p>24</p>
            </button>
            <button>
              <Image src={LikeIcon} alt="" width={0} height={0} />
              <p className="text-[#F66A6A]">24</p>
            </button>
          </div>
          <div className={`${s.flexbox} justify-center gap-6`}>
            <Button style="default">
              <Image src={ListIcon} alt="" width={0} height={0} />
              목록으로
            </Button>
            <Button style="default">
              <Image src={EditIcon} alt="" width={0} height={0} />
              수정하기
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PostDetail;
