/* eslint-disable react-hooks/exhaustive-deps */
import Chart from 'chart.js';
import React, {useEffect, useRef} from 'react';

export const LineChart = ({options, data, type, width, height, className, centerText}) => {
    const chartRef = useRef();

    // Create a custom plugin to draw text in the center of the chart
    Chart.pluginService.register({
        // beforeDraw: function (chart) {
        //   if (chart.config.options.centerText) {
        //     const ctx = chart.chart.ctx;
        //     const chartArea = chart.chartArea;
        //     const text = chart.config.options.centerText;

        //     // Calculate the position to center the text
        //     const x = chartArea.left + chartArea.width / 2;
        //     const y = chartArea.top + chartArea.height / 2;

        //     ctx.save();
        //     ctx.textAlign = 'center';
        //     ctx.textBaseline = 'middle';
        //     ctx.font = '16px Arial'; // You can customize the font size and style here
        //     ctx.fillStyle = 'black'; // You can customize the text color here
        //     ctx.fillText(text, x, y);
        //     ctx.restore();
        //   }
        // }

        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
                const ctx = chart.chart.ctx;
                const centerConfig = chart.config.options.elements.center;
                const fontStyle = centerConfig.fontStyle || 'Roboto';
                const txt = centerConfig.text;
                const color = centerConfig.color || '#000';
                const maxFontSize = centerConfig.maxFontSize || 75;
                const sidePadding = centerConfig.sidePadding || 20;
                const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
                ctx.font = '24px ' + fontStyle;
                const stringWidth = ctx.measureText(txt).width;
                const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;
                const widthRatio = elementWidth / stringWidth;
                const newFontSize = Math.floor(30 * widthRatio);
                const elementHeight = chart.innerRadius * 2;
                let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                let minFontSize = centerConfig.minFontSize;
                let wrapText = false;
                if (minFontSize === undefined) {
                    minFontSize = 20;
                }
                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                ctx.font = fontSizeToUse + 'px ' + fontStyle;
                ctx.fillStyle = color;
                if (!wrapText) {
                    ctx.fillText(txt, centerX, centerY);
                    return;
                }
                centerY -= 0;
                ctx.fillText(txt, centerX, centerY);
            }
        }
    });

    useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');
        const chart = new Chart(myChartRef, {
            type: type,
            options: {
                ...options,
                // centerText: centerText // Pass the centerText prop to chart options
                elements: {
                    center: {
                        text: centerText,
                        // color: colors.grayLight,
                        sidePadding: 20,
                        maxFontSize: 30,
                        lineHeight: 25
                    }
                }
            },
            data
        });
        return () => {
            chart.destroy();
        };
    }, []);

    useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');
        const chart = new Chart(myChartRef, {
            type: type,
            options: {
                ...options,
                // centerText: centerText // Pass the centerText prop to chart options
                elements: {
                    center: {
                        text: centerText,
                        // color: colors.grayLight,
                        sidePadding: 20,
                        maxFontSize: 30,
                        lineHeight: 25
                    }
                }
            },
            data
        });
        return () => {
            chart.destroy();
        };
    }, [data, centerText]);

    return (
        <div className={className}>
            <canvas id="myChart" ref={chartRef} width={width} height={height} />
        </div>
    );
};
