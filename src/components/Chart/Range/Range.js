import React from 'react';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const RangeProgress = styled.div`
  display: flex;
  height: 12px;
  position: relative;
  margin-top: 10px;
  border-radius: 9999px;
  background-color: #f4f4f4;
`;

const Progress = styled.div`
  flex-grow: 1;
  position: relative;

  .icon-arrow {
    width: 20px;
    height: 20px;
    background: url('https://static.chotot.com/storage/default_images/arrow-bottom.svg') no-repeat;
    background-size: contain;
    position: absolute;

    &.icon-arrow-2 {
      left: -10px;
      bottom: -25px;
    }
    &.icon-arrow-1 {
      right: -10px;
      bottom: -25px;
    }

    .icon-text {
      position: absolute;
      bottom: -25px;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.1;
      letter-spacing: normal;
      text-align: center;
      color: ${({ color }) => color && `${color.start}`};
    }
  }

  &.middle {
    flex-grow: 4;
    background-image: ${({ color }) =>
      color && `linear-gradient(to right, ${color.start}, ${color.end})`};

    .label {
      position: absolute;
      left: 20%;
      width: 150px;
      bottom: -53px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: oblique;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: #222222;
      ${mediaBreakPointDown(
        'ltmd',
        `
        bottom: -40px;
        font-size: 12px;
          `
      )};
    }
  }

  &.right {
    background-color: #f4f4f4;
    .label {
      position: absolute;
      right: 0;
      top: -23px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.71;
      letter-spacing: normal;
      text-align: center;
      color: #9b9b9b;
      ${mediaBreakPointDown(
        'ltmd',
        `
        font-size: 12px;
          `
      )};
    }
  }
  &.left {
    background-color: #f4f4f4;
  }
`;

const ProgressMark = styled.div`
  height: 100%;
  width: 2px;
  background: #f4f4f4;
  margin-left: ${({ value }) => value + '%'};

  .label-text {
    position: absolute;
    top: -50px;
    left: ${({ value }) => value - 3 + '%'};
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: center;
    color: #222222;
  }
  .label-number {
    position: absolute;
    top: -30px;
    left: ${({ value }) => value - 3 + '%'};
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.68;
    letter-spacing: normal;
    text-align: center;
    color: ${({ color }) => color && `${color.start}`};
  }
`;

export const Range = ({ chart }) => {
  const total = chart.max - chart.min;
  const cost = chart.median - chart.min;
  const remain = Math.round((cost / total) * 100);

  const tickFormat = (d) => {
    const dt = new Date(d);
    const monthNames = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    return `${monthNames[dt.getMonth()]}/${dt.getFullYear()}`;
  };

  const colorF = { start: chart.color.start, end: chart.color.end };

  return (
    <RangeProgress>
      <Progress color={colorF} className="left">
        <div className="icon-arrow icon-arrow-1">
          <span className="icon-text">{chart.min}</span>
        </div>
      </Progress>
      <Progress color={colorF} className="middle">
        <ProgressMark color={colorF} value={remain}>
          <div className="label-text">Trung bình</div>
          <div className="label-number">{chart.median}</div>
        </ProgressMark>
        <div className="label">
          Khoảng giá phổ biến {tickFormat(chart.chart[chart.chart.length - 1].time)}
        </div>
      </Progress>
      <Progress color={colorF} className="right">
        <div className="label">{chart.unit}</div>
        <div className="icon-arrow icon-arrow-2">
          <span className="icon-text">{chart.max}</span>
        </div>
      </Progress>
    </RangeProgress>
  );
};
