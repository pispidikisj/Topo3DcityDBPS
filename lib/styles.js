/*
 | Copyright 2015 Pispidikis john
 |
 | Licensed under the   GNU GENERAL PUBLIC LICENSE  Version 3
 | you may not use this file except in compliance with the License.
 |
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */






userConfig.style=[];
userConfig.style.defaultstyle=[];
 userConfig.style.fillcolor=[];
userConfig.style.strokecolor=[];
userConfig.style.currentlayerid=[];

//defaultstyle

var defaultstyle=new ol.style.Style({
             fill: new ol.style.Fill({
             color: '#ffcc33'
              }),
             stroke: new ol.style.Stroke({
              color: '#000000',
              width: 2
              }),
              image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#ffcc33'
               })
             })
             });
             
userConfig.style.defaultstyle.push(defaultstyle);             
//style.push(defaultstyle);
