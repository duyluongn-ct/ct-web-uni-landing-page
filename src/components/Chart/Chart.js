/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  XYPlot,
  makeWidthFlexible,
  XAxis,
  YAxis,
  LineMarkSeries,
  Hint,
  ChartLabel,
} from 'react-vis';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import LoadMore from './LoadMore/LoadMore';
import { Range } from './Range/Range';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const WrapperChart = styled.div`
  display: block;
  height: 100%;
  flex-basis: 49.4%;
  margin-bottom: 12px;
  background-color: #fff;

  &:first-child {
    flex-basis: 100%;
  }

  ${mediaBreakPointDown(
    'ltmd',
    `
  flex-basis: 100%;
      `
  )};

  .rv-xy-plot__axis__tick__text {
    fill: #9b9b9b;
  }

  .rv-xy-plot__series {
    path {
      stroke: ${({ color }) => color + ' !important'};
    }
    circle {
      stroke: ${({ color }) => color + ' !important'};
      fill: ${({ color }) => color + ' !important'};
      stroke-width: 0.1px !important;

      &:hover {
        stroke-width: 8px !important;
        stroke: ${({ colorEnd }) => colorEnd + ' !important'};
      }
    }
  }
  .rv-hint {
    z-index: 10;
    /* right: 10px !important; */

    .hint {
      color: ${({ color }) => color};
    }
  }
`;

const WrapperPrice = styled.div`
  padding: 50px 31px;
  height: 140px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: bold;
  border-bottom: 1px solid #f4f4f4;
  margin: 0;
  padding: 12px 12px 9px 12px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #222222;

  ${mediaBreakPointDown(
    'ltmd',
    `
    font-size: 16px;
  `
  )};
`;

const Chart = ({ data = {}, totals = {}, link = '' }) => {
  const [dataArr, setDataArr] = useState([]);
  const [currentHover, setCurrentHover] = useState({});

  useEffect(() => {
    const newDataArr = data?.chart.map((d) => {
      // const arr = d.time.split("-");
      return {
        x: new Date(d.time), // `T${parseInt(arr[1], 10)}`,
        y: d.median,
      };
    });
    setDataArr(newDataArr);
    setCurrentHover(newDataArr[newDataArr.length - 1]);
  }, [data]);

  const tickFormat = (d) => {
    const monthNames = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    return monthNames[d.getMonth()];
  };

  return (
    <WrapperChart color={data.color?.main || '#4a90e2'} colorEnd={data.color?.end || '#4a90e2'}>
      <Title>{data.title}</Title>
      <WrapperPrice>
        <Range chart={data} />
      </WrapperPrice>
      <FlexibleXYPlot xType="time-utc" height="280">
        <XAxis tickFormat={tickFormat} style={{ strokeDasharray: 5.5 }} />
        <YAxis style={{ strokeDasharray: 5.5 }} />
        <ChartLabel
          text={data.unit}
          className="alt-y-label"
          includeMargin={false}
          xPercent={0.035}
          yPercent={0.06}
          style={{
            transform: 'rotate(-90)',
            textAnchor: 'end',
          }}
        />
        <LineMarkSeries
          className="linemark-series-example-2"
          curve="curveMonotoneX"
          data={dataArr}
          onValueMouseOver={(datapoint) => {
            // does something on click
            // you can access the value of the event
            setCurrentHover(datapoint);
          }}
          // data={[{ x: 1, y: 10 }, { x: 1.5, y: 29 }, { x: 3, y: 17 }]}
        />
        {currentHover.y && (
          <Hint value={currentHover}>
            <p className="hint">{currentHover.y}</p>
          </Hint>
        )}
      </FlexibleXYPlot>
      <LoadMore
        link={link}
        total={
          data.type_id === null
            ? totals.total
            : totals[data.type_key]
            ? totals[data.type_key][data.type_id]
            : 0
        }
      />
    </WrapperChart>
  );
};

export default Chart;
