import { Space, Tooltip } from 'antd';
import React from 'react';

export default function OpenapiItem({ el }: { el: any }) {
  return (
    <div className="w-full">
      <h3>{el.title ?? 'No data available'}</h3>
      {/* <Image
                src={el.firstimage}
                width={200}
                height={200}
                alt="가게 사진"
              /> */}
      <Space wrap>
        <Tooltip placement="topRight" title={el.addr1} color="#999">
          <div className=" w-full h-[300px] bg-gray/100 overflow-hidden">
            {/* <button className="w-full h-full "> */}
            {el.firstimage || el.firstimage2 ? (
              <img
                src={el.firstimage || el.firstimage2}
                className="h-full object-cover"
                // className="w-[200px] h-full bg-gray/100 object-cover"
                alt=""
              />
            ) : (
              <p className="w-[inherit] bg-gray/100 object-cover">
                이미지가 없습니다.
              </p>
            )}
            {/* </button> */}
          </div>
        </Tooltip>
      </Space>
    </div>
  );
}
